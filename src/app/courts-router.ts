import express from "express";
import { RepositoryInProduction } from "../entities/courts/infrastructure/repository-in-production";
import { RepositoryInProduction as ClubRepository } from "../entities/clubs/infrastructure/repository-in-production";
import { Handler as CreateHandler } from "../entities/courts/app/create/handler";
import { CreateCourtCommand } from "../entities/courts/domain";
import { Handler as FindByIdHandler } from "../entities/courts/app/find-by-id/handler";
import { Handler as FindClubByIdHandler } from "../entities/clubs/app/find-by-id/handler";

interface CreateCommand extends Omit<CreateCourtCommand, "id"> {}

const courtsRouter = express.Router();
const repository = new RepositoryInProduction();
const clubRepository = new ClubRepository();
const createHandler = new CreateHandler(repository);
const findByIdHandler = new FindByIdHandler(repository);
const findClubByHandler = new FindClubByIdHandler(clubRepository);

courtsRouter.post("/", async (req, res) => {
  try {
    const body = req.body as CreateCommand;
    const club = await findClubByHandler.handle(body.clubId);
    if (!club) {
      res.status(400).send("Club not found");
      return;
    }
    await createHandler.handle(body);
    res.status(201).send({
      message: "Court created",
      court: body.name,
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
    const court = await findByIdHandler.handle(req.params.id);
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
