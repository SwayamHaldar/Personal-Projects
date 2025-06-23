
import express from 'express';
import bodyParser from 'body-parser';
import  sequel  from './config.js'; 
import router from './routes/add.js'
import road from './routes/getAll.js';  
const app= express();
const port = 3000;


app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/api', router);
app.use('/', road);
app.listen(port, ()=> console.log(`App is running on port ${port}.`));


sequel.authenticate()
    .then(()=> console.log("Connected!!"))
    .catch((err)=> console.error("Couldnt connect", err));

sequel.sync()
    .then(()=> console.log("Models Syncronized"))
    .catch(err => console.error("Model sync failed: ", err));
