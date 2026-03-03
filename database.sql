-- Create the database (optional, if not already created)
CREATE DATABASE IF NOT EXISTS module_b;
USE module_b;

-- Companies table
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    telephone VARCHAR(50),
    email VARCHAR(255),
    owner_name VARCHAR(255),
    owner_mobile VARCHAR(50),
    owner_email VARCHAR(255),
    contact_name VARCHAR(255),
    contact_mobile VARCHAR(50),
    contact_email VARCHAR(255),
    is_deactivated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_fr TEXT,
    gtin VARCHAR(14) NOT NULL UNIQUE,
    brand VARCHAR(255),
    country VARCHAR(255),
    gross_weight DECIMAL(10,2),
    net_weight DECIMAL(10,2),
    weight_unit VARCHAR(10),
    image VARCHAR(255),
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
        ON UPDATE CASCADE
);

-- Index GTIN for faster search
CREATE INDEX idx_gtin ON products(gtin);

-- Optional: Example data for testing
INSERT INTO companies (name, address, telephone, email, owner_name, owner_mobile, owner_email, contact_name, contact_mobile, contact_email)
VALUES ('Euro Expo', 'Boulevard de l''Europe, 69680 Chassieu, France', '+33 1 41 56 78 00', 'mail.customerservice.hdq@example.com', 'Benjamin Smith', '+33 6 12 34 56 78', 'b.smith@example.com', 'Marie Dubois', '+33 6 98 76 54 32', 'm.dubois@example.com');

INSERT INTO products (company_id, name_en, name_fr, description_en, description_fr, gtin, brand, country, gross_weight, net_weight, weight_unit, image)
VALUES (1, 'Organic Apple Juice', 'Jus de pomme biologique', 'Our organic apple juice is pressed from 100% fresh organic apples, with no added sugars or preservatives.', 'Notre jus de pomme biologique est pressé à partir de 100% de pommes biologiques fraîches, sans sucre ajouté ni conservateurs.', '03000123456789', 'Green Orchard', 'France', 1.1, 1.0, 'L', 'placeholder.png');
