-- Create sponsor_projects table
CREATE TABLE IF NOT EXISTS sponsor_projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  funding_goal DECIMAL(10,2) NOT NULL,
  current_funding DECIMAL(10,2) DEFAULT 0,
  location VARCHAR(255),
  category VARCHAR(100),
  status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  image_url VARCHAR(500),
  contact_person VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);

-- Insert sample sponsor projects
INSERT INTO sponsor_projects (name, description, funding_goal, current_funding, location, category, status, start_date, end_date, contact_person, contact_email, contact_phone) VALUES
('School Renovation Project', 'Complete renovation of Kigali Primary School including new classrooms, library, and playground equipment.', 50000.00, 25000.00, 'Kigali, Rwanda', 'Education', 'active', '2024-01-15', '2024-12-31', 'Marie Claire', 'marie@rfo.org', '+250788123456'),
('Medical Equipment for Rural Clinic', 'Purchase essential medical equipment for the rural health clinic in Musanze district.', 30000.00, 15000.00, 'Musanze, Rwanda', 'Healthcare', 'active', '2024-02-01', '2024-08-31', 'Dr. Jean Paul', 'jean@rfo.org', '+250788234567'),
('Community Garden Initiative', 'Establish sustainable community gardens to provide fresh produce and nutrition education.', 15000.00, 8000.00, 'Huye, Rwanda', 'Agriculture', 'active', '2024-03-01', '2024-11-30', 'Sophie Uwimana', 'sophie@rfo.org', '+250788345678'),
('Youth Skills Training Center', 'Build and equip a vocational training center for at-risk youth in Kigali.', 75000.00, 35000.00, 'Kigali, Rwanda', 'Education', 'active', '2024-01-01', '2025-06-30', 'Patrick Nkurunziza', 'patrick@rfo.org', '+250788456789'),
('Clean Water Project', 'Install water purification systems and wells for remote villages.', 40000.00, 20000.00, 'Nyamagabe, Rwanda', 'Infrastructure', 'active', '2024-04-01', '2024-10-31', 'Grace Mukamana', 'grace@rfo.org', '+250788567890');
