import { Member } from "../../domain";
import { Repository } from "../../domain/repository-in-memory";

export class Handler {
  constructor(private repository: Repository) {}

  handle(id: string): Member | undefined {
    return this.repository.findById(id);
  }
}
