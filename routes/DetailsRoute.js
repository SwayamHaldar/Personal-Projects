
const express= require('express');
const routes= express.Router();
const Details = require('../models/students')

routes.post('/add', async(req, res) => {
    const { ID, name, age, grade } = req.body;

    if (!ID || !name || !age || !grade) {
        return res.status(400).send("Cannot leave fields empty");
    }

    try{
        await Details.create({
            ID: ID,
            Name: name,
            Age: age,
            Grade: grade
        })
        res.send("Successfully Registered.")
    }
    catch(err){
        console.error(" ADD Error: ", err);
        return res.status(400).send("Invalid Entry");
    }
});

routes.put('/update/:id', async(req, res) => {
    const ID =parseInt(req.params.id);
    const { age, grade } = req.body;

    
    if(isNaN(ID)){
        return res.status(400).send("Invalid ID");
    }
    
        
    if (!age || !grade) {
        return res.status(400).send("Age and grade are required for update"); 
    }

    try{
        await Details.update({
            Age: age,
            Grade: grade
        },{
            where: {ID: ID}
        });
        res.send("Update Successsful!"); 
    }
    catch(err){
        console.error("Update ERROR: ",err);
        return res.status(400).send("Unacceptable Update")
    }
});

routes.delete('/delete/:id', async(req,res)=>{
    const ID = req.params.id.split(",").map(id=> parseInt(id));       // Consider ID to be unique 3 digit code
    
    if(!ID){
        return res.status(400).send("Invalid ID");
    }

    try {
        const deletedCount = await Details.destroy({
            where: { ID: ID }
        });

        if (deletedCount === 0) {
            return res.status(404).send(`No matching ID(s) found for deletion`);
        }

        res.send(`${deletedCount} record(s) deleted`);
    }
    catch(err){
        console.error("Deletion ERROR: ",err);
        return res.status(400).send("Unavailable Item");
    }
});

routes.get('/', async(req, res) => {
    
    try{
        const Student = await Details.findAll();
        res.json(Student);
    }
    catch(err){
        console.error("Output ERROR: ",err);
        return res.status(500).send("No Data Available");
    }
});

module.exports= routes;