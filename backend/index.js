express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables from .env file
dotenv.config();

// Add Pesapal integration (only if keys are provided)
const axios = require('axios');
let pesapalConfig = null;
if (process.env.PESAPAL_CONSUMER_KEY && process.env.PESAPAL_CONSUMER_SECRET) {
  pesapalConfig = {
    consumer_key: process.env.PESAPAL_CONSUMER_KEY,
    consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    base_url: process.env.PESAPAL_ENV === 'sandbox' ? 'https://cybqa.pesapal.com/pesapalv3' : 'https://pay.pesapal.com/v3'
  };
}

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend at Vite's default port
app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for child image uploads
const childStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/child-images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadChild = multer({ storage: childStorage });

// Multer setup for news image uploads
const newsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/news-images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadNews = multer({ storage: newsStorage });

// Multer setup for sponsor project image uploads
const sponsorProjectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/sponsor-project-images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadSponsorProject = multer({ storage: sponsorProjectStorage });

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'rfo_db',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('MySQL Connected');
});

// JWT Secret (use env in production)
const JWT_SECRET = process.env.JWT_SECRET || 'rfo_secret_key_change_me';

// Middleware: Verify JWT for admin routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// Updated /api/donate route to handle Pesapal payment initiation
app.post('/api/donate', async (req, res) => {
  const { amount, donor_name, email, child_need_id, gift_id, gift_name, gift_category, payment_method, recurring } = req.body;
  if (!amount || !donor_name || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (payment_method === 'pesapal') {
    if (!pesapalConfig) {
      // Pesapal not configured, use fallback
      console.log('Pesapal not configured, using fallback for donation');
      let query = 'INSERT INTO donations (amount, donor_name, email, date, status, payment_method';
      let values = [amount, donor_name, email, new Date(), 'pending', payment_method];
      let placeholders = '?, ?, ?, NOW(), ?, ?';

      if (child_need_id) {
        query += ', child_need_id';
        placeholders += ', ?';
        values.push(child_need_id);
      }

      if (gift_id) {
        query += ', gift_id, gift_name, gift_category';
        placeholders += ', ?, ?, ?';
        values.push(gift_id, gift_name, gift_category);
      }

      if (recurring !== undefined) {
        query += ', recurring';
        placeholders += ', ?';
        values.push(recurring);
      }

      query += ') VALUES (' + placeholders + ')';

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error logging donation:', err);
          return res.status(500).json({ error: 'Failed to log donation' });
        }
        // Redirect to success page to simulate successful payment
        const successUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/donation-success`;
        res.json({ payment_link: successUrl });
      });
    } else {
      // Try to create Pesapal payment
      try {
        const orderTrackingId = `rfo_donation_${Date.now()}`;
        const callbackUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/donation-success`;

        // Submit order to Pesapal
        const submitOrderResponse = await axios.post(`${pesapalConfig.base_url}/api/Transactions/SubmitOrderRequest`, {
          id: orderTrackingId,
          currency: 'USD',
          amount: parseFloat(amount),
          description: gift_id ? `Gift Donation: ${gift_name}` : 'Donation to RFO',
          callback_url: callbackUrl,
          notification_id: process.env.PESAPAL_NOTIFICATION_ID || '',
          billing_address: {
            email_address: email,
            phone_number: '',
            country_code: '',
            first_name: donor_name.split(' ')[0],
            middle_name: '',
            last_name: donor_name.split(' ').slice(1).join(' ') || '',
            line_1: '',
            line_2: '',
            city: '',
            state: '',
            postal_code: '',
            zip_code: ''
          }
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getPesapalAccessToken()}`
          }
        });

        if (submitOrderResponse.data && submitOrderResponse.data.redirect_url) {
          // Log donation with status 'pending' and order tracking ID
          let query = 'INSERT INTO donations (amount, donor_name, email, date, status, payment_method, transaction_ref';
          let values = [amount, donor_name, email, new Date(), 'pending', payment_method, orderTrackingId];
          let placeholders = '?, ?, ?, NOW(), ?, ?, ?';

          if (child_need_id) {
            query += ', child_need_id';
            placeholders += ', ?';
            values.push(child_need_id);
          }

          if (gift_id) {
            query += ', gift_id, gift_name, gift_category';
            placeholders += ', ?, ?, ?';
            values.push(gift_id, gift_name, gift_category);
          }

          if (recurring !== undefined) {
            query += ', recurring';
            placeholders += ', ?';
            values.push(recurring);
          }

          query += ') VALUES (' + placeholders + ')';

          db.query(query, values, (err, result) => {
            if (err) {
              console.error('Error logging donation:', err);
              return res.status(500).json({ error: 'Failed to log donation' });
            }
            // Return payment link to frontend for redirect
            res.json({ payment_link: submitOrderResponse.data.redirect_url });
          });
        } else {
          throw new Error('Failed to initialize payment');
        }
      } catch (error) {
        console.error('Pesapal payment error:', error);
        // Log donation with status 'pending' when Pesapal fails
        let query = 'INSERT INTO donations (amount, donor_name, email, date, status, payment_method';
        let values = [amount, donor_name, email, new Date(), 'pending', payment_method];
        let placeholders = '?, ?, ?, NOW(), ?, ?';

        if (child_need_id) {
          query += ', child_need_id';
          placeholders += ', ?';
          values.push(child_need_id);
        }

        if (gift_id) {
          query += ', gift_id, gift_name, gift_category';
          placeholders += ', ?, ?, ?';
          values.push(gift_id, gift_name, gift_category);
        }

        if (recurring !== undefined) {
          query += ', recurring';
          placeholders += ', ?';
          values.push(recurring);
        }

        query += ') VALUES (' + placeholders + ')';

        db.query(query, values, (err, result) => {
          if (err) {
            console.error('Error logging donation:', err);
            return res.status(500).json({ error: 'Failed to log donation' });
          }
          // For test mode, redirect to success page to simulate successful payment
          const successUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/donation-success`;
          res.json({ payment_link: successUrl });
        });
      }
    }
  } else {
    // Existing donation logging for other payment methods
    let query = 'INSERT INTO donations (amount, donor_name, email, date, status';
    let values = [amount, donor_name, email, 'pending'];
    let placeholders = '?, ?, ?, NOW(), ?';

    if (child_need_id) {
      query += ', child_need_id';
      placeholders += ', ?';
      values.push(child_need_id);
    }

    if (gift_id) {
      query += ', gift_id, gift_name, gift_category';
      placeholders += ', ?, ?, ?';
      values.push(gift_id, gift_name, gift_category);
    }

    if (payment_method) {
      query += ', payment_method';
      placeholders += ', ?';
      values.push(payment_method);
    }

    if (recurring !== undefined) {
      query += ', recurring';
      placeholders += ', ?';
      values.push(recurring);
    }

    query += ') VALUES (' + placeholders + ')';

    db.query(query, values, (err, result) => {
      if (err) {
       console.error('Error logging donation:', err);
        return res.status(500).json({ error: 'Failed to log donation' });
      }
      const message = gift_id
        ? 'Gift donation submitted and pending approval. Thank you for your generous gift!'
        : 'Donation submitted and pending approval. Thank you!';
      res.json({ message });
    });
  }
});

// Helper function to get Pesapal access token
async function getPesapalAccessToken() {
  try {
    const response = await axios.post(`${pesapalConfig.base_url}/api/Auth/RequestToken`, {
      consumer_key: pesapalConfig.consumer_key,
      consumer_secret: pesapalConfig.consumer_secret
    });
    return response.data.token;
  } catch (error) {
    console.error('Error getting Pesapal access token:', error);
    throw error;
  }
}

// Flutterwave webhook endpoint to update donation status
app.post('/api/flutterwave-webhook', express.json({ type: 'application/json' }), (req, res) => {
  const event = req.body;
  if (event.event === 'charge.completed' && event.data.status === 'successful') {
    const txRef = event.data.tx_ref;
    const query = 'UPDATE donations SET status = ? WHERE transaction_ref = ?';
    db.query(query, ['approved', txRef], (err, result) => {
      if (err) {
        console.error('Error updating donation status:', err);
        return res.status(500).send('Error');
      }
      res.status(200).send('OK');
    });
  } else {
    res.status(200).send('Event ignored');
  }
});

// Public: Get total donations
app.get('/api/donations-total', (req, res) => {
  const query = 'SELECT SUM(amount) as total FROM donations WHERE status = "approved"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching donation total:', err);
      return res.status(500).json({ error: 'Failed to fetch donation total' });
    }
    const total = results[0].total || 0;
    res.json({ total });
  });
});

// Public: Register for help
app.post('/api/register-help', (req, res) => {
  const { full_name, age, gender, phone, email, location, needs, message } = req.body;
  if (!full_name || !phone || !location || !needs || needs.length === 0) {
    return res.status(400).json({ error: 'Name, phone, location, and at least one need are required' });
  }
  const query = `INSERT INTO help_requests (full_name, age, gender, phone, email, location, needs, message) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [full_name, age, gender, phone, email, location, JSON.stringify(needs), message], (err, result) => {
    if (err) {
      console.error('Error registering help request:', err);
      return res.status(500).json({ error: 'Failed to register request' });
    }
    res.json({ message: 'Your request has been submitted! We will contact you soon.' });
  });
});

// Admin: Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM admins WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Database error during admin login:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const admin = results[0];
    try {
      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { username: admin.username, role: admin.role } });
    } catch (compareError) {
      console.error('Error comparing password:', compareError);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Admin: Get Dashboard Stats (Fixed with async/await - no Promise.all nesting)
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    // Helper function to run a query
    const runQuery = (sql) => {
      return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      });
    };

    // Run all queries sequentially (or parallel with Promise.all if preferred)
    const donationsCount = await runQuery('SELECT COUNT(*) as total FROM donations WHERE status = "approved"');
    const totalAmount = await runQuery('SELECT SUM(amount) as total_amount FROM donations WHERE status = "approved"');
    const totalRequests = await runQuery('SELECT COUNT(*) as total_requests FROM help_requests');
    const pendingRequests = await runQuery('SELECT COUNT(*) as pending_requests FROM help_requests WHERE status = "Pending"');

    res.json({
      donations: donationsCount.total,
      totalDonated: totalAmount.total_amount || 0,
      helpRequests: totalRequests.total_requests,
      pendingRequests: pendingRequests.pending_requests
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get All Donations (with search/pagination)
app.get('/api/admin/donations', authenticateToken, (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  let query = 'SELECT * FROM donations ORDER BY date DESC LIMIT ? OFFSET ?';
  let params = [parseInt(limit), (page - 1) * limit];
  if (search) {
    query = 'SELECT * FROM donations WHERE donor_name LIKE ? OR email LIKE ? ORDER BY date DESC LIMIT ? OFFSET ?';
    params = [`%${search}%`, `%${search}%`, ...params.slice(1)];
  }
  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Export Donations to CSV
app.get('/api/admin/donations/export', authenticateToken, (req, res) => {
  db.query('SELECT * FROM donations', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    let csv = 'ID,Amount,Donor Name,Email,Date,Status\n';
    results.forEach(row => {
      csv += `${row.id},${row.amount},"${row.donor_name}","${row.email}","${row.date}","${row.status}"\n`;
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('rfo-donations.csv');
    res.send(csv);
  });
});

// Admin: Update Donation Status
app.put('/api/admin/donations/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const query = 'UPDATE donations SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Status updated successfully' });
  });
});

// Admin: Get All Help Requests (with filters/pagination)
app.get('/api/admin/help-requests', authenticateToken, (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;
  let baseQuery = 'SELECT * FROM help_requests';
  let whereClause = [];
  let params = [];

  if (status) {
    whereClause.push('status = ?');
    params.push(status);
  }
  if (search) {
    whereClause.push('(full_name LIKE ? OR phone LIKE ? OR location LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const fullQuery = baseQuery + (whereClause.length ? ' WHERE ' + whereClause.join(' AND ') : '') + ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (page - 1) * limit);

  db.query(fullQuery, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Update Help Request Status
app.put('/api/admin/help-requests/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['Pending', 'Reviewed', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const query = 'UPDATE help_requests SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Status updated successfully' });
  });
});

// Public: Get all child needs with donation progress
app.get('/api/child-needs', (req, res) => {
  const query = `
    SELECT cn.*,
           COALESCE(SUM(d.amount), 0) as donated_amount,
           (COALESCE(SUM(d.amount), 0) / cn.money_needed) * 100 as progress_percentage
    FROM child_needs cn
    LEFT JOIN donations d ON cn.id = d.child_need_id AND d.status = 'approved'
    WHERE cn.status = "active"
    GROUP BY cn.id
    ORDER BY cn.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Create child need
app.post('/api/admin/child-needs', authenticateToken, uploadChild.single('image'), (req, res) => {
  const { name, age, location, problem, money_needed } = req.body;
  const image_url = req.file ? `/uploads/child-images/${req.file.filename}` : null;
  if (!name || !age || !location || !problem || !money_needed) {
    return res.status(400).json({ error: 'Name, age, location, problem, and money needed are required' });
  }
  const query = 'INSERT INTO child_needs (name, image_url, age, location, problem, money_needed, status, created_at) VALUES (?, ?, ?, ?, ?, ?, "active", NOW())';
  db.query(query, [name, image_url, age, location, problem, parseFloat(money_needed)], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Child need created successfully', id: result.insertId });
  });
});

// Admin: Update child need
app.put('/api/admin/child-needs/:id', authenticateToken, uploadChild.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, age, location, problem, money_needed } = req.body;
  const image_url = req.file ? `/uploads/child-images/${req.file.filename}` : null;
  if (!name || !age || !location || !problem || !money_needed) {
    return res.status(400).json({ error: 'Name, age, location, problem, and money needed are required' });
  }
  let query = 'UPDATE child_needs SET name = ?, age = ?, location = ?, problem = ?, money_needed = ?';
  let params = [name, age, location, problem, parseFloat(money_needed)];
  if (image_url) {
    query += ', image_url = ?';
    params.push(image_url);
  }
  query += ' WHERE id = ?';
  params.push(id);
  db.query(query, params, (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Child need updated successfully' });
  });
});

// Admin: Delete child need
app.delete('/api/admin/child-needs/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM child_needs WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Child need deleted successfully' });
  });
});

// Admin: Get all child needs (admin view)
app.get('/api/admin/child-needs', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM child_needs ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Public: Get all news
app.get('/api/news', (req, res) => {
  const query = 'SELECT id, title, excerpt, image_url, category, DATE_FORMAT(created_at, "%M %d, %Y") as date FROM news ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Public: Get single news article
app.get('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM news WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'News not found' });
    res.json(results[0]);
  });
});

// Admin: Create news
app.post('/api/admin/news', authenticateToken, uploadNews.single('image'), (req, res) => {
  const { title, content, excerpt, category } = req.body;
  const image_url = req.file ? `/uploads/news-images/${req.file.filename}` : null;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const query = 'INSERT INTO news (title, content, excerpt, image_url, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, content, excerpt, image_url, category], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'News created successfully', id: result.insertId });
  });
});

// Admin: Update news
app.put('/api/admin/news/:id', authenticateToken, uploadNews.single('image'), (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, category } = req.body;
  const image_url = req.file ? `/uploads/news-images/${req.file.filename}` : null;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  let query = 'UPDATE news SET title = ?, content = ?, excerpt = ?, category = ?';
  let params = [title, content, excerpt, category];
  if (image_url) {
    query += ', image_url = ?';
    params.push(image_url);
  }
  query += ' WHERE id = ?';
  params.push(id);
  db.query(query, params, (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'News updated successfully' });
  });
});

// Admin: Delete news
app.delete('/api/admin/news/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM news WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'News deleted successfully' });
  });
});

// Admin: Get all news (admin view)
app.get('/api/admin/news', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM news ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Public: Register as volunteer
app.post('/api/volunteers', (req, res) => {
  const { full_name, email, phone, skills, availability, message } = req.body;
  if (!full_name || !email || !phone || !skills || !availability) {
    return res.status(400).json({ error: 'Full name, email, phone, skills, and availability are required' });
  }
  const query = 'INSERT INTO volunteers (full_name, email, phone, skills, availability, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, "pending", NOW())';
  db.query(query, [full_name, email, phone, JSON.stringify(skills), availability, message], (err, result) => {
    if (err) {
      console.error('Error registering volunteer:', err);
      return res.status(500).json({ error: 'Failed to register volunteer' });
    }
    res.json({ message: 'Your volunteer application has been submitted! We will contact you soon.' });
  });
});

// Admin: Get all volunteers (with filters/pagination)
app.get('/api/admin/volunteers', authenticateToken, (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;
  let baseQuery = 'SELECT * FROM volunteers';
  let whereClause = [];
  let params = [];

  if (status) {
    whereClause.push('status = ?');
    params.push(status);
  }
  if (search) {
    whereClause.push('(full_name LIKE ? OR email LIKE ? OR phone LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const fullQuery = baseQuery + (whereClause.length ? ' WHERE ' + whereClause.join(' AND ') : '') + ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (page - 1) * limit);

  db.query(fullQuery, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Update volunteer status
app.put('/api/admin/volunteers/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const query = 'UPDATE volunteers SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    if (status === 'approved') {
      // Send email
      const getEmailQuery = 'SELECT email, full_name FROM volunteers WHERE id = ?';
      db.query(getEmailQuery, [id], (emailErr, emailResult) => {
        if (!emailErr && emailResult.length > 0) {
          const volunteer = emailResult[0];
          const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: volunteer.email,
            subject: 'Volunteer Application Approved',
            text: `Dear ${volunteer.full_name},\n\nCongratulations! Your volunteer application has been approved. We are excited to have you join our team.\n\nBest regards,\nRFO Team`
          };
          transporter.sendMail(mailOptions, (mailErr, info) => {
            if (mailErr) {
              console.error('Error sending email:', mailErr);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        }
      });
    }
    res.json({ message: 'Status updated successfully' });
  });
});

// Admin: Delete volunteer
app.delete('/api/admin/volunteers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM volunteers WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Volunteer deleted successfully' });
  });
});

// Create volunteers table (one-time setup)
app.post('/api/setup-volunteers-table', (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS volunteers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      skills JSON NOT NULL,
      availability VARCHAR(100) NOT NULL,
      message TEXT,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_email (email),
      INDEX idx_created_at (created_at)
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating volunteers table:', err);
      return res.status(500).json({ error: 'Failed to create volunteers table' });
    }

    // Insert sample data
    const insertSampleQuery = `
      INSERT INTO volunteers (full_name, email, phone, skills, availability, message, status) VALUES
      ('John Doe', 'john@example.com', '+250788854883', '["teaching", "community"]', 'Weekdays (morning)', 'I want to help with education programs', 'pending'),
      ('Jane Smith', 'jane@example.com', '+250788854884', '["medical", "fundraising"]', 'Weekends (afternoon)', 'Healthcare professional with fundraising experience', 'approved')
    `;

    db.query(insertSampleQuery, (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error inserting sample data:', insertErr);
        return res.status(500).json({ error: 'Table created but failed to insert sample data' });
      }
      res.json({ message: 'Volunteers table created successfully with sample data' });
    });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Public: Save contact message from Contact page
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const query = 'INSERT INTO contact_messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())';
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    res.json({ message: 'Message sent successfully' });
  });
});

// Admin: Get all contact messages from Contact page
app.get('/api/admin/contact-messages', authenticateToken, (req, res) => {
  const query = 'SELECT id, name, email, subject, message, created_at FROM contact_messages ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contact messages:', err);
      return res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
    res.json(results);
  });
});

// Public: Get all testimonials
app.get('/api/testimonials', (req, res) => {
  const query = 'SELECT id, name, role, image_url, quote FROM testimonials ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Get all testimonials (admin view)
app.get('/api/admin/testimonials', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM testimonials ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Create testimonial
app.post('/api/admin/testimonials', authenticateToken, (req, res) => {
  const { name, role, image_url, quote } = req.body;
  if (!name || !role || !quote) {
    return res.status(400).json({ error: 'Name, role, and quote are required' });
  }
  const query = 'INSERT INTO testimonials (name, role, image_url, quote) VALUES (?, ?, ?, ?)';
  db.query(query, [name, role, image_url, quote], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Testimonial created successfully', id: result.insertId });
  });
});

// Admin: Update testimonial
app.put('/api/admin/testimonials/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, role, image_url, quote } = req.body;
  if (!name || !role || !quote) {
    return res.status(400).json({ error: 'Name, role, and quote are required' });
  }
  const query = 'UPDATE testimonials SET name = ?, role = ?, image_url = ?, quote = ? WHERE id = ?';
  db.query(query, [name, role, image_url, quote, id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Testimonial updated successfully' });
  });
});

// Admin: Delete testimonial
app.delete('/api/admin/testimonials/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM testimonials WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Testimonial deleted successfully' });
  });
});

// Public: Get all partners
app.get('/api/partners', (req, res) => {
  const query = 'SELECT id, name, logo_url, category, website_url, description FROM partners ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Get all partners (admin view)
app.get('/api/admin/partners', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM partners ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Create partner
app.post('/api/admin/partners', authenticateToken, (req, res) => {
  const { name, logo_url, category, website_url, description } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }
  const query = 'INSERT INTO partners (name, logo_url, category, website_url, description) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, logo_url, category, website_url, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Partner created successfully', id: result.insertId });
  });
});

// Admin: Update partner
app.put('/api/admin/partners/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, logo_url, category, website_url, description } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }
  const query = 'UPDATE partners SET name = ?, logo_url = ?, category = ?, website_url = ?, description = ? WHERE id = ?';
  db.query(query, [name, logo_url, category, website_url, description, id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Partner updated successfully' });
  });
});

// Admin: Delete partner
app.delete('/api/admin/partners/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM partners WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Partner deleted successfully' });
  });
});

// Public: Get all sponsor projects
app.get('/api/sponsor-projects', (req, res) => {
  const query = `
    SELECT sp.*,
           CASE WHEN sp.status = 'completed' THEN sp.funding_goal ELSE COALESCE(SUM(s.sponsorship_amount), 0) END as current_funding,
           (CASE WHEN sp.status = 'completed' THEN sp.funding_goal ELSE COALESCE(SUM(s.sponsorship_amount), 0) END / sp.funding_goal) * 100 as progress_percentage,
           COUNT(s.id) as sponsor_count
    FROM sponsor_projects sp
    LEFT JOIN sponsors s ON sp.id = s.project_id AND s.status = 'approved'
    WHERE sp.status = 'active'
    GROUP BY sp.id
    ORDER BY sp.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Public: Get single sponsor project
app.get('/api/sponsor-projects/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT sp.*,
           COALESCE(SUM(s.sponsorship_amount), 0) as current_funding,
           (COALESCE(SUM(s.sponsorship_amount), 0) / sp.funding_goal) * 100 as progress_percentage,
           COUNT(s.id) as sponsor_count
    FROM sponsor_projects sp
    LEFT JOIN sponsors s ON sp.id = s.project_id AND s.status = 'approved'
    WHERE sp.id = ? AND sp.status = 'active'
    GROUP BY sp.id
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json(results[0]);
  });
});

// Public: Submit sponsorship
app.post('/api/sponsor', (req, res) => {
  const { full_name, organization, email, phone, address, sponsorship_amount, project_id, sponsorship_type, payment_method, message } = req.body;
  if (!full_name || !email || !sponsorship_amount || !project_id) {
    return res.status(400).json({ error: 'Full name, email, sponsorship amount, and project are required' });
  }
  const query = 'INSERT INTO sponsors (full_name, organization, email, phone, address, sponsorship_amount, project_id, sponsorship_type, payment_method, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "pending")';
  db.query(query, [full_name, organization, email, phone, address, parseFloat(sponsorship_amount), project_id, sponsorship_type, payment_method, message], (err, result) => {
    if (err) {
      console.error('Error submitting sponsorship:', err);
      return res.status(500).json({ error: 'Failed to submit sponsorship' });
    }
    res.json({ message: 'Sponsorship submitted successfully. We will contact you soon for payment confirmation.' });
  });
});

// Admin: Get all sponsor projects (admin view)
app.get('/api/admin/sponsor-projects', authenticateToken, (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;
  let baseQuery = `
    SELECT sp.*,
           COALESCE(SUM(s.sponsorship_amount), 0) as current_funding,
           (COALESCE(SUM(s.sponsorship_amount), 0) / sp.funding_goal) * 100 as progress_percentage,
           COUNT(s.id) as sponsor_count
    FROM sponsor_projects sp
    LEFT JOIN sponsors s ON sp.id = s.project_id AND s.status = 'approved'
  `;
  let whereClause = [];
  let params = [];

  if (status) {
    whereClause.push('sp.status = ?');
    params.push(status);
  }
  if (search) {
    whereClause.push('(sp.name LIKE ? OR sp.description LIKE ? OR sp.location LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const groupBy = ' GROUP BY sp.id';
  const fullQuery = baseQuery + (whereClause.length ? ' WHERE ' + whereClause.join(' AND ') : '') + groupBy + ' ORDER BY sp.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (page - 1) * limit);

  db.query(fullQuery, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Create sponsor project
app.post('/api/admin/sponsor-projects', authenticateToken, uploadSponsorProject.single('image'), (req, res) => {
  const { name, description, funding_goal, location, category, start_date, end_date, contact_person, contact_email, contact_phone, image_url } = req.body;
  const uploaded_image_url = req.file ? `/uploads/sponsor-project-images/${req.file.filename}` : image_url;
  if (!name || !funding_goal) {
    return res.status(400).json({ error: 'Name and funding goal are required' });
  }
  const query = 'INSERT INTO sponsor_projects (name, description, funding_goal, location, category, start_date, end_date, image_url, contact_person, contact_email, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, parseFloat(funding_goal), location, category, start_date, end_date, uploaded_image_url, contact_person, contact_email, contact_phone], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Sponsor project created successfully', id: result.insertId });
  });
});

// Admin: Update sponsor project
app.put('/api/admin/sponsor-projects/:id', authenticateToken, uploadSponsorProject.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, funding_goal, funding_raised, location, category, status, start_date, end_date, contact_person, contact_email, contact_phone, image_url } = req.body;
  const uploaded_image_url = req.file ? `/uploads/sponsor-project-images/${req.file.filename}` : image_url;
  if (!name || !funding_goal) {
    return res.status(400).json({ error: 'Name and funding goal are required' });
  }
  let query = 'UPDATE sponsor_projects SET name = ?, description = ?, funding_goal = ?, current_funding = ?, location = ?, category = ?, status = ?, start_date = ?, end_date = ?, contact_person = ?, contact_email = ?, contact_phone = ?';
  let params = [name, description, parseFloat(funding_goal), parseFloat(funding_raised || 0), location, category, status, start_date, end_date, contact_person, contact_email, contact_phone];
  if (uploaded_image_url !== undefined) {
    query += ', image_url = ?';
    params.push(uploaded_image_url);
  }
  query += ' WHERE id = ?';
  params.push(id);
  db.query(query, params, (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Sponsor project updated successfully' });
  });
});

// Admin: Delete sponsor project
app.delete('/api/admin/sponsor-projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sponsor_projects WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Sponsor project deleted successfully' });
  });
});

// Admin: Get all sponsors (admin view)
app.get('/api/admin/sponsors', authenticateToken, (req, res) => {
  const { status, search, page = 1, limit = 10 } = req.query;
  let baseQuery = `
    SELECT s.*,
           sp.name as project_name,
           sp.category as project_category
    FROM sponsors s
    LEFT JOIN sponsor_projects sp ON s.project_id = sp.id
  `;
  let whereClause = [];
  let params = [];

  if (status) {
    whereClause.push('s.status = ?');
    params.push(status);
  }
  if (search) {
    whereClause.push('(s.full_name LIKE ? OR s.email LIKE ? OR s.organization LIKE ? OR sp.name LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  const fullQuery = baseQuery + (whereClause.length ? ' WHERE ' + whereClause.join(' AND ') : '') + ' ORDER BY s.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (page - 1) * limit);

  db.query(fullQuery, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Admin: Update sponsor status
app.put('/api/admin/sponsors/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'approved', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const query = 'UPDATE sponsors SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Update failed' });
    // If approved, update project funding
    if (status === 'approved') {
      const getSponsorQuery = 'SELECT project_id, sponsorship_amount FROM sponsors WHERE id = ?';
      db.query(getSponsorQuery, [id], (getErr, getResult) => {
        if (getErr) return res.status(500).json({ error: 'Failed to get sponsor details' });
        const { project_id, sponsorship_amount } = getResult[0];
        const updateProjectQuery = 'UPDATE sponsor_projects SET current_funding = current_funding + ? WHERE id = ?';
        db.query(updateProjectQuery, [sponsorship_amount, project_id], (updateErr, updateResult) => {
          if (updateErr) return res.status(500).json({ error: 'Failed to update project funding' });
          res.json({ message: 'Sponsor status updated successfully and project funding updated' });
        });
      });
    } else {
      res.json({ message: 'Sponsor status updated successfully' });
    }
  });
});

// Admin: Delete sponsor
app.delete('/api/admin/sponsors/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sponsors WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Sponsor deleted successfully' });
  });
});

// Create sponsor projects table (one-time setup)
app.post('/api/setup-sponsor-projects-table', (req, res) => {
  const fs = require('fs');
  const path = require('path');

  const sqlFile = path.join(__dirname, 'create_sponsor_projects_table.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating sponsor projects table:', err);
      return res.status(500).json({ error: 'Failed to create sponsor projects table' });
    }
    res.json({ message: 'Sponsor projects table created successfully with sample data' });
  });
});

// Create sponsors table (one-time setup)
app.post('/api/setup-sponsors-table', (req, res) => {
  const fs = require('fs');
  const path = require('path');

  const sqlFile = path.join(__dirname, 'create_sponsors_table.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating sponsors table:', err);
      return res.status(500).json({ error: 'Failed to create sponsors table' });
    }
    res.json({ message: 'Sponsors table created successfully with sample data' });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
