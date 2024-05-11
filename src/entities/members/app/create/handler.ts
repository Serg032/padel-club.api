import { CreateMemberCommand } from "../../domain";
import { Repository } from "../../domain/repository-in-memory";

export class Handler {
  constructor(private repository: Repository) {}

  handle(command: CreateMemberCommand) {
    this.repository.save({
      id: command.id,
      name: command.name,
      email: command.email,
      money: command.money,
      type: command.type,
    });
  }
}
