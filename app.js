const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql2');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server running on port ${port}`));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'H6&=3bo0!',
    database: 'student-details' 
});

db.connect((err) => {
    if (err) {
        console.error('Connection error:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID', db.threadId);
});

app.post('/add', (req, res) => {
    const { ID, name, age, grade } = req.body;

    if (!ID || !name || !age || !grade) {
        return res.status(400).send("Cannot leave fields empty");
    }

    const sql = `INSERT INTO student_details (ID, Name, Age, Grade) VALUES (?, ?, ?, ?)`; 
    const values = [ID, name, age, grade]; 
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failure", err);
            return res.status(500).send(`Error inserting data: ${err.message}`); 
        }
        res.send("Registered successfully");
    });
});

app.put('/update/:id', (req, res) => {
    const ID = req.params.id;
    const { age, grade } = req.body;

    const idlist = 'SELECT ID FROM student_details';
    
    if(Number.isInteger(ID)){
        for (let idl in idlist){
        if(ID==idl);
        else return res.status(500).send("ID doesn't exist:");
        }
    }
     else return res.status(500).send("ID should be a valid number.");
    
        
    if (!age || !grade) {
        return res.status(400).send("Age and grade are required for update"); 
    }

    const sql = `UPDATE student_details SET Age = ?, Grade = ? WHERE ID = ?`;
    db.query(sql, [age, grade, ID], (err, result) => {
        if (err) {
            console.error("Could not update data", err); 
            return res.status(500).send("Error updating data");
        }
        if (result.affectedRows > 0) {
            res.send("Updated successfully");
        } else {
            res.status(404).send("No student found with the given ID");
        }
    });
});

app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;       // Consider ID to be unique 3 digit code
    const idlist = 'SELECT ID FROM student_details';
    
    for (let idl in idlist){
        if(id==idl){}
        else{
            return res.status(500).send("ID doesn't exist");
        }
    }
    
    const sql ='DELETE FROM student_details WHERE ID = ?';
    db.query(sql,[id],(err,results)=>{
        if(err)
            return res.status(500).send("ID doesn't exists!",err);
        
        res.send("Deleted successfully");
    });
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM student_details', (err, results) => {
        if (err) {
            console.error("Could not fetch data", err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});

