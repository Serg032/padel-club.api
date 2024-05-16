import { Court } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  clubs: Set<Court> = new Set<Court>();
  async save(club: Court): Promise<void> {
    this.clubs.add(club);
  }
  async findById(id: string): Promise<Court | undefined> {
    return Array.from(this.clubs).find((club) => club.id === id);
  }
}
