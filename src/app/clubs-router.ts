import express, { Request, Response } from "express";
import { CreateClubCommand } from "../entities/clubs/domain";
import { RepositoryInProduction } from "../entities/clubs/infrastructure/repository-in-production";
import { Handler as CreateHandler } from "../entities/clubs/app/create/handler";
import { Handler as FindByIdHandler } from "../entities/clubs/app/find-by-id/handler";

interface CreateCommand extends Omit<CreateClubCommand, "id"> {}

const clubsRouter = express.Router();
const repository = new RepositoryInProduction();
const createHandler = new CreateHandler(repository);
const findByIdHandler = new FindByIdHandler(repository);

clubsRouter.post("/", async (req: Request, res: Response) => {
  try {
    await createHandler.handle(req.body as CreateCommand);
    res.status(201).send({
      message: "clubCreated",
      club: req.body.name,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send("An error occurred while saving the club");
    }
  }
});

clubsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const club = await findByIdHandler.handle(req.params.id);
    if (club) {
      res.status(200).send(club);
    } else {
      res.status(404).send("Club not found");
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send("An error occurred while finding the club");
    }
  }
});

export default clubsRouter;
