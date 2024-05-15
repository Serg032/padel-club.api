import { Court } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";

export class Handler {
  constructor(private repository: RepositoryInMemory) {}

  async handle(id: string): Promise<Court | undefined> {
    return await this.repository.findById(id);
  }
}
