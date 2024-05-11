import { CreateCourtCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  handle(command: CreateCourtCommand) {
    this.repository.save({
      id: command.id,
      name: command.name,
      clubId: command.clubId,
    });
  }
}
