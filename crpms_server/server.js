const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
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
app.post('/registration', (req, res) => {

    const { user_name, role, password } = req.body;

    const sql = "INSERT INTO users (user_name, role, password) VALUES (?, ?, ?)";

    db.query(sql, [user_name, role, password], (err, result) => {
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
    db.query(sql,[user_name,password], (err,result)=>{
        if (err) {
            return res.status(500).json(err);
        }
        if (result.length>0) {
            res.json({success:true, user:result[0]});
        }
        else{
            res.json({success: false, message:'invalid userName or password'});
        }
    })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});