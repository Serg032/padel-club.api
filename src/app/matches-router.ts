import express from "express";
import { RepositoryInProduction } from "../entities/matches/infrastructure/repository-in-production";
import { Handler as CreateHandler } from "../entities/matches/app/create/handler";
import { CreateMatchCommand } from "../entities/matches/domain";
import { Handler as FindByIdHandler } from "../entities/matches/app/find-by-id/handler";

const matchesRouter = express.Router();
const repository = new RepositoryInProduction();
const createHandler = new CreateHandler(repository);
const findByIdHandler = new FindByIdHandler(repository);

matchesRouter.post("/", async (req, res) => {
  try {
    await createHandler.create(req.body as CreateMatchCommand);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An error occurred while saving the match");
    }
  }
});

matchesRouter.get("/:id", async (req, res) => {
  try {
    const match = await findByIdHandler.handle(req.params.id);
    if (match) {
      res.status(200).send(match);
    } else {
      res.status(404).send("Match not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An error occurred while finding the match");
    }
  }
});

export default matchesRouter;
