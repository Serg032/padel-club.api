import express from "express";
import { RepositoryInProduction } from "../entities/members/infrastructure/repository-in-production";
import { Handler as CreateHandler } from "../entities/members/app/create/handler";
import { Handler as FindByIdHandler } from "../entities/members/app/find-by-id/handler";
import { CreateMemberCommand } from "../entities/members/domain";

const membersRouter = express.Router();
const repository = new RepositoryInProduction();
const createHandler = new CreateHandler(repository);
const findHandler = new FindByIdHandler(repository);

membersRouter.post("/", async (req, res) => {
  try {
    const member = await createHandler.handle(req.body as CreateMemberCommand);
    res.status(201).send({
      message: "Member created",
      member,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An error occurred while saving the member");
    }
  }
});

membersRouter.get("/:id", async (req, res) => {
  try {
    const member = await findHandler.handle(req.params.id);
    if (member) {
      res.status(200).send(member);
    } else {
      res.status(404).send("Member not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("An error occurred while finding the member");
    }
  }
});

export default membersRouter;
