import { Member } from "../../domain";
import { Repository } from "../../domain/repository-in-memory";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(id: string): Promise<Member | undefined> {
    return await this.repository.findById(id);
  }
}
