import express from "express";
import clubsRouter from "./app/clubs-router";
import connectDB from "./conection";
import "dotenv/config";
import courtsRouter from "./app/courts-router";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use("/clubs", clubsRouter);
app.use("/courts", courtsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
