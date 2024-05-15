import express, { Request, Response } from "express";
import { clubModel } from "../entities/clubs/infrastructure/club-schema";
import { CreateClubCommand } from "../entities/clubs/domain";
import { RepositoryInProduction } from "../entities/clubs/infrastructure/repository-in-production";
import { Handler } from "../entities/clubs/app/create/handler";

interface CreateCommand extends Omit<CreateClubCommand, "id"> {}

const router = express.Router();
const repository = new RepositoryInProduction();
const createHandler = new Handler(repository);

router.post("/", (req: Request, res: Response) => {
  try {
    createHandler.handle(req.body as CreateCommand);
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

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const club = await clubModel.findById(req.params.id);
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

export default router;
