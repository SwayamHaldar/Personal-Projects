import express from "express";
import bodyParser from "body-parser";
import sequel from "./config.js";
import router from "./routes/add.js";
import road from "./routes/get.js";
import path from "./routes/delete.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/input", router);
app.use("/give", road);
app.use("/remove", path);
app.listen(port, () => console.log(`App is running on port ${port}.`));

sequel
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequel.sync();
