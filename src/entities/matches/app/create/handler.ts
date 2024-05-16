import { CreateMatchCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}

  async create(match: CreateMatchCommand): Promise<void> {
    await this.repository.save(match);
  }
}
