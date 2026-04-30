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
app.post('/registration', async(req, res) => {

    const { user_name, password } = req.body;
    const hashedpassword= await bcrypt.hash(password,10);
    const sql = "INSERT INTO users (user_name, password) VALUES (?, ?)";

    db.query(sql, [user_name, hashedpassword], (err, result) => {
        if (err) return res.status(500).json(err);
        res.send('Data inserted successfully');
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
})
app.post('/login',(req,res)=>{
    const {user_name,password} =req.body;
    const sql="SELECT * FROM users WHERE user_name= ? AND password=?";
    db.query(sql,[user_name,password], async(err,result)=>{
        if (err) {
            return res.status(500).json(err);
        }
        if (result.length===0) {
            res.json({success:true, message:'user not found'});
        }
        const user=result[0];
        const isMatch= await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json({
                success: true,
                message: 'Login successful',
                user: user
            });
        }
        else{
            res.json({
                success: false,
                message:'wrong password'
            });
        }
        }
       
    )
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
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});