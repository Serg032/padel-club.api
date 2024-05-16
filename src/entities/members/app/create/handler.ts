import { CreateMemberCommand } from "../../domain";
import { Repository } from "../../domain/repository-in-memory";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(command: CreateMemberCommand) {
    await this.repository.save({
      id: command.id,
      name: command.name,
      email: command.email,
      username: command.username,
      password: command.password,
      money: command.money,
      type: command.type,
    });
  }
}
