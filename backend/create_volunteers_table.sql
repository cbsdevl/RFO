-- Create volunteers table for the RFO database
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
);

-- Insert sample data for testing
INSERT INTO volunteers (full_name, email, phone, skills, availability, message, status) VALUES
('John Doe', 'john@example.com', '+250788854883', '["teaching", "community"]', 'Weekdays (morning)', 'I want to help with education programs', 'pending'),
('Jane Smith', 'jane@example.com', '+250788854884', '["medical", "fundraising"]', 'Weekends (afternoon)', 'Healthcare professional with fundraising experience', 'approved');
