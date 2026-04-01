import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'crpms',
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function query(sql, params) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function initializeDatabase() {
  await query(`CREATE DATABASE IF NOT EXISTS crpms`);
  await query(`USE crpms`);

  await query(`
    CREATE TABLE IF NOT EXISTS cars (
      id INT AUTO_INCREMENT PRIMARY KEY,
      plate VARCHAR(50) NOT NULL,
      type VARCHAR(100) NOT NULL,
      model VARCHAR(100) NOT NULL,
      year INT NOT NULL,
      phone VARCHAR(50) NOT NULL,
      mechanic VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS service_records (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_name VARCHAR(255) NOT NULL,
      amount_charged DECIMAL(12,2) NOT NULL,
      service_date DATE NOT NULL,
      plate_number VARCHAR(50) NOT NULL,
      status VARCHAR(25) DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_record_id INT NOT NULL,
      amount_paid DECIMAL(12,2) NOT NULL,
      payment_date DATE NOT NULL,
      status VARCHAR(25) DEFAULT 'PAID',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_record_id) REFERENCES service_records(id) ON DELETE CASCADE
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'mechanic',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [users] = await pool.query('SELECT id FROM users WHERE username = ?', ['admin']);
  if (users.length === 0) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await query('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', ['admin', passwordHash, 'admin']);
    console.log('Created default admin user: admin / admin123');
  }
}

app.post('/api/cars', async (req, res) => {
  try {
    const { plate, type, model, year, phone, mechanic } = req.body;
    await query(
      'INSERT INTO cars (plate, type, model, year, phone, mechanic) VALUES (?, ?, ?, ?, ?, ?)',
      [plate, type, model, year, phone, mechanic]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Unable to save car details.' });
  }
});

app.post('/api/service-record', async (req, res) => {
  try {
    const { service_name, amount_charged, service_date, plate_number } = req.body;
    await query(
      'INSERT INTO service_records (service_name, amount_charged, service_date, plate_number) VALUES (?, ?, ?, ?)',
      [service_name, amount_charged, service_date, plate_number]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Unable to save service record.' });
  }
});

app.get('/api/service-record', async (req, res) => {
  try {
    const rows = await query(
      `SELECT
         id AS Record_number,
         plate_number AS Plate_number,
         service_name AS Service_name,
         amount_charged AS Amount_charged,
         service_date AS Service_date,
         status
       FROM service_records
       ORDER BY id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to retrieve service records.' });
  }
});

app.delete('/api/service-record/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM service_records WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete service record.' });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const { record_number, amount, date } = req.body;
    await query(
      'INSERT INTO payments (service_record_id, amount_paid, payment_date) VALUES (?, ?, ?)',
      [record_number, amount, date]
    );
    await query('UPDATE service_records SET status = ? WHERE id = ?', ['PAID', record_number]);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Unable to save payment.' });
  }
});

app.get('/api/reports/daily', async (req, res) => {
  try {
    const reportDate = req.query.date;
    const rows = await query(
      `SELECT
         sr.plate_number AS Plate_number,
         sr.service_name AS Service_name,
         p.amount_paid AS Amount_paid
       FROM payments p
       JOIN service_records sr ON p.service_record_id = sr.id
       WHERE p.payment_date = ?`,
      [reportDate]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to build daily report.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [userRows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = userRows[0];
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login error' });
  }
});

app.listen(port, async () => {
  try {
    await initializeDatabase();
    console.log(`CRPMS backend listening on http://localhost:${port}`);
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
});
