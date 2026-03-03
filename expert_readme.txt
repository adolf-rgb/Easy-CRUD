# Project Name: Companies and Products Management System

## Overview
This project implements a management system for companies and their products, including functionalities for admin to create, edit, list, and deactivate companies and products. It also provides public-facing pages for product verification and display.

## Technologies Used
- PHP
- MySQL/MariaDB
- HTML/CSS/JavaScript (for frontend)
- JSON API endpoints

## Setup Instructions

### 1. Database Setup
- Create a MySQL database (e.g., `your_db`)
- Import the provided database dump file to create the schema (tables, constraints, indexes)
- Update database connection parameters in PHP files accordingly

### 2. Environment Configuration
- Place the project files on your web server (Apache, Nginx, etc.)
- Ensure PHP is configured and enabled
- Adjust URL paths if deploying in a subfolder or different port

### 3. Accessing the Application
- Admin login page: `http://yourserver/XX_module_b/login`
- Manage companies: `http://yourserver/XX_module_b/companies.php` (or similar)
- Create new company: `company_create.php`
- Edit company: `company_edit.php?id=...`
- List companies: `company_list.php`
- Manage products: `products.php` and related endpoints
- Public verification page: `/XX_module_b/01/[GTIN]`
- Public product page: `/XX_module_b/01/[GTIN]`

### 4. Usage
- Log in with passphrase "admin" (no robust authentication)
- Create, edit, and deactivate companies and products
- Upload images for products (if image upload functionality is implemented)
- Use JSON API endpoints for data retrieval and integration
- Use the public pages for product info and GTIN validation

## Notes
- The database dump must contain the correct schema, FK constraints, and indexes, especially on the GTIN field.
- The project is intended as a prototype, so focus on core functionalities.
- For production, enhance security, authentication, and validation as needed.

## Additional
- Ensure all PHP files are accessible via the correct URL paths
- Use Firefox Developer Edition for testing as specified
- If deploying on a different server setup, adjust paths accordingly

## Contact
For questions or issues, contact: Thomas Seng Hin Mak or Fong Hok Kin

---

**End of README**