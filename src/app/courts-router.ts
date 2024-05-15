import express from "express";
import { RepositoryInProduction } from "../entities/courts/infrastructure/repository-in-production";
import { Handler as CreateHandler } from "../entities/courts/app/create/handler";
import { CreateCourtCommand } from "../entities/courts/domain";

interface CreateCommand extends Omit<CreateCourtCommand, "id"> {}

const courtsRouter = express.Router();
const repository = new RepositoryInProduction();
const createHandler = new CreateHandler(repository);

courtsRouter.post("/", async (req, res) => {
  try {
    await createHandler.handle(req.body as CreateCommand);
    res.status(201).send({
      message: "courtCreated",
      court: req.body.name,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An error occurred while saving the court");
    }
  }
});

courtsRouter.get("/:id", async (req, res) => {
  try {
    const court = await repository.findById(req.params.id);
    if (court) {
      res.status(200).send(court);
    } else {
      res.status(404).send("Court not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An error occurred while finding the court");
    }
  }
});

export default courtsRouter;
