import { randomUUID } from "crypto";
import { CreateClubCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}

  handle(command: CreateClubCommand) {
    this.repository.save({
      id: command.id,
      name: command.name,
      address: command.address,
    });
  }
}
