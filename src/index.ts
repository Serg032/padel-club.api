import express, { Request, Response } from "express";
import router from "./app/clubs-router";
import connectDB from "./conection";
import "dotenv/config";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use("/clubs", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
