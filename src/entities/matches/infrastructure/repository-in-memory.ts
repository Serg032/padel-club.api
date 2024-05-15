import { Match } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  matches: Set<Match> = new Set<Match>();
  save(match: Match): void {
    this.matches.add(match);
  }

  findById(id: string): Match | undefined {
    return Array.from(this.matches).find((match) => match.id === id);
  }
}
