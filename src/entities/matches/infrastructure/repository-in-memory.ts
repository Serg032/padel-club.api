import { Match } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  matches: Set<Match> = new Set<Match>();
  async save(match: Match): Promise<void> {
    this.matches.add(match);
  }

  async findById(id: string): Promise<Match | undefined> {
    return Array.from(this.matches).find((match) => match.id === id);
  }
}
