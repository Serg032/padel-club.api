import { Match } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}

  create(match: Match): void {
    this.repository.save(match);
  }
}
