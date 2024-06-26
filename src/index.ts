import express from "express";
import connectDB from "./conection";
import cors from "cors";
import "dotenv/config";
import clubsRouter from "./app/clubs-router";
import courtsRouter from "./app/courts-router";
import membersRouter from "./app/members-router";
import matchesRouter from "./app/matches-router";

const app = express();
const port = 8080;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/clubs", clubsRouter);
app.use("/courts", courtsRouter);
app.use("/members", membersRouter);
app.use("/matches", matchesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
