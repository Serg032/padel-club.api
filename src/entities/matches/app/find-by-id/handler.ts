import { Match } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  async handle(id: string): Promise<Match | undefined> {
    return await this.repository.findById(id);
  }
}
