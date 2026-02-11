CREATE DATABASE IF NOT EXISTS urban_harvest_hub;
USE urban_harvest_hub;

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_slug VARCHAR(100) NOT NULL,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.00,
    is_holiday BOOLEAN DEFAULT FALSE,
    holiday_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Assuming a user system exists or will exist
    item_id INT NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    payment_intent_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- Dummy Data for Items
INSERT INTO items (title, description, category_slug, date, location, price) VALUES
('Urban Gardening 101', 'Learn the basics of growing your own food in the city.', 'gardening', '2026-10-15 10:00:00', 'Central Park Community Garden', 25.00),
('Composting Masterclass', 'Turn your kitchen scraps into black gold.', 'sustainability', '2026-10-20 14:00:00', 'Eco Hub Downtown', 15.00),
('Rooftop Hydroponics', 'Advanced techniques for soil-less farming on rooftops.', 'technology', '2026-11-05 09:00:00', 'SkyLine Towers', 50.00),
('Community Clean-Up', 'Join us for a neighborhood clean-up event.', 'community', '2026-11-12 08:00:00', 'Main Street Square', 0.00),
('Seed Swapping Event', 'Bring your extra seeds and trade with neighbors.', 'gardening', '2026-11-15 11:00:00', 'The Green Barn', 5.00);

-- Dummy Data for Users (Password: password123 hashed)
-- Note: In a real scenario, use the registration endpoint to create users with properly hashed passwords.
-- This insert is for schema completeness example.
-- INSERT INTO users (name, email, password, role) VALUES ('Admin User', 'admin@example.com', '$2a$10$X7...', 'admin'); 

-- Dummy Data for Bookings
INSERT INTO bookings (user_id, item_id, status, payment_intent_id) VALUES
(1, 1, 'confirmed', 'pi_mock_123456789'),
(2, 3, 'pending', 'pi_mock_987654321');
