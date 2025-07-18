import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import sequel from "./config.js";
import router from "./routes/StudentRoutes.js";
import road from "./routes/EnrollRoutes.js";
import path from "./routes/SubjectRoutes.js";
import segway from "./routes/LoginRoutes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use("/Student", router);
app.use("/Enroll", road);
app.use("/SUBS", path);
app.use("/login", segway);
app.listen(port, () => console.log(`App is running on port ${port}.`));

sequel
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

await sequel.sync();
