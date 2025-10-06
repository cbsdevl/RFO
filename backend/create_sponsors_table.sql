-- Create sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  sponsorship_amount DECIMAL(10,2) NOT NULL,
  project_id INT,
  sponsorship_type ENUM('individual', 'corporate', 'foundation') DEFAULT 'individual',
  payment_method VARCHAR(100),
  message TEXT,
  status ENUM('pending', 'approved', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES sponsor_projects(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_project_id (project_id),
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

-- Insert sample sponsors
INSERT INTO sponsors (full_name, organization, email, phone, address, sponsorship_amount, project_id, sponsorship_type, payment_method, message, status) VALUES
('John Smith', 'TechCorp Rwanda', 'john@techcorp.rw', '+250788111111', 'KG 123 St, Kigali, Rwanda', 10000.00, 1, 'corporate', 'bank_transfer', 'Proud to support education in Rwanda', 'approved'),
('Sarah Johnson', NULL, 'sarah.johnson@email.com', '+250788222222', 'KG 456 St, Kigali, Rwanda', 5000.00, 2, 'individual', 'mobile_money', 'Healthcare is so important for rural communities', 'approved'),
('Rwanda Development Foundation', 'RDF', 'info@rdf.org', '+250788333333', 'KG 789 St, Kigali, Rwanda', 25000.00, 4, 'foundation', 'bank_transfer', 'Investing in youth development for a better future', 'approved'),
('Marie Claire', 'Local Business Owner', 'marie.claire@business.rw', '+250788444444', 'KG 321 St, Kigali, Rwanda', 3000.00, 3, 'individual', 'mobile_money', 'Happy to contribute to community gardens', 'pending'),
('International Aid Organization', 'IAO', 'contact@iao.org', '+250788555555', 'KG 654 St, Kigali, Rwanda', 15000.00, 5, 'foundation', 'bank_transfer', 'Clean water access is fundamental for development', 'approved'),
('David Wilson', NULL, 'david.wilson@email.com', '+250788666666', 'KG 987 St, Kigali, Rwanda', 2000.00, 1, 'individual', 'mobile_money', 'Supporting education initiatives', 'pending');
