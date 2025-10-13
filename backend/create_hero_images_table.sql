CREATE TABLE hero_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255) DEFAULT '',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default images
INSERT INTO hero_images (image_url, alt_text, display_order) VALUES
('/garuka1.jpg', 'Children in classroom', 1),
('/garuka2.jpg', 'Community outreach program', 2),
('/garuka3.jpg', 'Educational materials distribution', 3),
('/garuka4.jpg', 'School facility improvement', 4),
('/hero-bg.JPG', 'NGO impact showcase', 5);
