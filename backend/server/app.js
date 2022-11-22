import express from "express";
import bodyParser from "body-parser";
import travelsRouter from "./routes/travelsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
const app = express();
app.use(bodyParser.json());

app.use("/travels", travelsRouter); //connect to travels-routes + every route from thi file will start with /travels
app.use("/users", usersRouter);
app.listen(5000);
