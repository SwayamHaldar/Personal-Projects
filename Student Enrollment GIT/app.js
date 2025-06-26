import express from "express";
import bodyParser from "body-parser";
import sequel from "./config.js";
import router from "./routes/StudentRoutes.js";
import road from "./routes/EnrollRoutes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/Student", router);
app.use("/Enroll", road);
app.listen(port, () => console.log(`App is running on port ${port}.`));

sequel
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
