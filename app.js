const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const db = require('./config/db');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');

const upload = multer({ dest: 'public/uploads/' });

// ---------- Routes ----------
// Login
app.get('/XX_module_b/login', (req, res) => res.render('admin/login'));
app.post('/XX_module_b/login', (req, res) => {
    if(req.body.passphrase==='admin'){ req.session.admin=true; return res.redirect('/XX_module_b/dashboard'); }
    res.send('Wrong passphrase');
});

// Dashboard
app.get('/XX_module_b/dashboard', auth, (req,res)=>res.render('admin/dashboard'));

// Companies
app.get('/XX_module_b/companies', auth, (req,res)=>{
    db.query("SELECT * FROM companies WHERE is_deactivated=0",(err, rows)=>res.render('admin/companies',{companies: rows}));
});
app.get('/XX_module_b/companies/new', auth, (req,res)=>res.render('admin/company_form'));
app.post('/XX_module_b/companies/save', auth, (req,res)=>{
    db.query("INSERT INTO companies SET ?", req.body, ()=>res.redirect('/XX_module_b/companies'));
});
app.get('/XX_module_b/companies/deactivate/:id', auth, (req,res)=>{
    db.query("UPDATE companies SET is_deactivated=1 WHERE id=?", [req.params.id]);
    db.query("UPDATE products SET is_hidden=1 WHERE company_id=?", [req.params.id]);
    res.redirect('/XX_module_b/companies');
});

// Products
app.get('/XX_module_b/products', auth, (req,res)=>{
    db.query("SELECT * FROM products", (err, rows)=>res.render('admin/products',{products: rows}));
});
app.get('/XX_module_b/products/new', auth, (req,res)=>{
    db.query("SELECT * FROM companies WHERE is_deactivated=0",(err, companies)=>res.render('admin/product_form',{companies}));
});
app.post('/XX_module_b/products/save', auth, upload.single('image'), (req,res)=>{
    if(!/^\d{13,14}$/.test(req.body.gtin)) return res.send("Invalid GTIN format");
    req.body.image = req.file ? req.file.filename : "placeholder.png";
    db.query("INSERT INTO products SET ?", req.body, ()=>res.redirect('/XX_module_b/products'));
});
app.get('/XX_module_b/products/hide/:id', auth, (req,res)=>{ db.query("UPDATE products SET is_hidden=1 WHERE id=?", [req.params.id]); res.redirect('/XX_module_b/products'); });
app.get('/XX_module_b/products/delete/:id', auth, (req,res)=>{ db.query("DELETE FROM products WHERE id=? AND is_hidden=1",[req.params.id]); res.redirect('/XX_module_b/products'); });

// Public Product Page
app.get('/XX_module_b/01/:gtin', (req,res)=>{
    const lang=req.query.lang||'en';
    db.query("SELECT p.*, c.name as company_name FROM products p JOIN companies c ON p.company_id=c.id WHERE p.gtin=? AND p.is_hidden=0",[req.params.gtin],
    (err, rows)=>{ if(!rows.length) return res.send("Not Found"); res.render('public/public_product',{product: rows[0], lang}); });
});

// GTIN Verify
app.get('/XX_module_b/verify',(req,res)=>res.render('public/gtin_verify',{results:null}));
app.post('/XX_module_b/verify',(req,res)=>{
    const codes=req.body.codes.split("\n"); let results=[]; let done=0;
    codes.forEach(code=>{
        db.query("SELECT * FROM products WHERE gtin=? AND is_hidden=0",[code.trim()],(err,rows)=>{
            results.push({code: code.trim(), valid: rows.length>0});
            done++; if(done===codes.length) res.render('public/gtin_verify',{results});
        });
    });
});

app.listen(PORT, ()=>console.log("Server running on port "+PORT));
