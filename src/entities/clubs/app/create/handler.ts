import { CreateClubCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(command: CreateClubCommand) {
    await this.repository.save({
      id: command.id,
      name: command.name,
      address: command.address,
    });
  }
}
