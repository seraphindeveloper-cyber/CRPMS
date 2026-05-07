const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bcrypt= require('bcrypt');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'CRPMS'
});

db.connect((err)=>{
    if(err){
    console.log('database connection failed', err);
    return;
    }
    console.log('database connected well👌👌')
})
app.get('/',(req,res)=>{
    res.send('welcome to home page');
});
app.post('/registration', async (req, res) => {
    const { user_name, password } = req.body;

    
    const checkSql = "SELECT * FROM users WHERE user_name = ?";
    
    db.query(checkSql, [user_name], async (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (data.length > 0) {
            return res.status(400).send('Username already exists');
        }

    
        const hashedpassword = await bcrypt.hash(password, 10);
        const insertSql = "INSERT INTO users (user_name, password) VALUES (?, ?)";

        db.query(insertSql, [user_name, hashedpassword], (err, result) => {
            if (err) return res.status(500).json(err);
            res.send('Data inserted successfully');
        });
    });
});

app.get('/services',(req,res)=>{
    const sql="SELECT * FROM services";
    db.query(sql, (err,result)=>{
        if (err) {
            res.status(500).json(err);
        }
        res.json(result);
    })
});
app.get('/cars',(req,res)=>{
  const sql="SELECT * FROM car";
  db.query(sql, (err,result)=>{
    if (err) {
      res.status(500).json(err);
    }
    res.json(result);
  })
});
app.post('/login', (req, res) => {
  const { user_name, password } = req.body;

  const sql = "SELECT * FROM users WHERE user_name = ?";

  db.query(sql, [user_name], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

  
    if (result.length === 0) {
      return res.json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result[0];

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({
        success: true,
        message: 'Login successful',
        user: user
      });
    } else {
      res.json({
        success: false,
        message: 'Wrong password'
      });
    }
  });
});
app.post('/addcar',(req,res)=>{
    const {plateNumber,
type,
model,
driver_phone,
manufactured_year,
mechanic_name,
user_id
}=req.body;
const sql="INSERT INTO car (plateNumber, type, model, driver_phone, manufactured_year, mechanic_name, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
db.query(sql,[plateNumber, type, model, driver_phone, manufactured_year, mechanic_name, user_id], (err, result) => {
  if (err) {
    console.log(err);
    return res.status(500).json(err); 
  }

  res.json({ message: "Car added successfully" });
});
});
app.post('/servicesrecord', (req, res) => {
  const { serviceCode, serviceDate, plateNumber } = req.body;

  const sql = `
    INSERT INTO servicesRecord (serviceDate,serviceCode,plateNumber)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [serviceDate,serviceCode,plateNumber], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Service recorded"
    });
  });
});
app.delete('/deletecar/:plateNumber', (req, res) => {

  const { plateNumber } = req.params;

  console.log("DELETE HIT:", plateNumber);

  const sql = "DELETE FROM car WHERE plateNumber = ?";

  db.query(sql, [plateNumber], (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: err
      });
    }

    console.log("RESULT:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    res.json({
      success: true,
      message: "Car deleted successfully"
    });

  });
});
app.get('/car/:plateNumber', (req, res) => {

  const { plateNumber } = req.params;

  const sql = `
    SELECT * FROM car
    WHERE plateNumber = ?
  `;

  db.query(sql, [plateNumber], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);

  });
});
app.put('/updatecar/:plateNumber', (req, res) => {

  const { plateNumber } = req.params;

  const {
    type,
    model,
    driver_phone,
    manufactured_year,
    mechanic_name,
    user_id
  } = req.body;

  const sql = `
    UPDATE car
    SET
      type = ?,
      model = ?,
      driver_phone = ?,
      manufactured_year = ?,
      mechanic_name = ?,
      user_id = ?
    WHERE plateNumber = ?
  `;

  db.query(
    sql,
    [
      type,
      model,
      driver_phone,
      manufactured_year,
      mechanic_name,
      user_id,
      plateNumber
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Car updated successfully"
      });

    }
  );
});
app.get('/servicesrecord', (req, res) => {

  const sql = "SELECT * FROM servicesrecord";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });

});
app.post('/payment', (req, res) => {

  const { amountPaid, paymentDate, recordNumber } = req.body;

  const sql = `
    INSERT INTO payment (amountPaid, paymentDate, recordNumber)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [amountPaid, paymentDate, recordNumber], (err, result) => {

    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Payment recorded successfully"
    });

  });
});
app.get('/report', (req, res) => {

  const sql = `
    SELECT 
      c.plateNumber,
      c.type,
      c.model,
      sr.serviceDate,
      sr.serviceCode,
      p.amountPaid,
      p.paymentDate
    FROM car c
    JOIN servicesrecord sr ON c.plateNumber = sr.plateNumber
    LEFT JOIN payment p ON sr.recordNumber = p.recordNumber
    ORDER BY sr.serviceDate DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});