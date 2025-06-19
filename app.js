const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const sequel= require('./config/database');
const DetailsRoutes= require('./routes/DetailsRoute');
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',DetailsRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));



sequel.authenticate()
    .then(()=> console.log("Connected!!"))
    .catch((err)=> console.error("Couldnt connect", err));

sequel.sync()
    .then(()=> console.log("Models Syncronized"))
    .catch(err => console.error("Model sync failed: ", err));

