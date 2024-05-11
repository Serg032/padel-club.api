import { Court } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  clubs: Set<Court> = new Set<Court>();
  save(club: Court): void {
    this.clubs.add(club);
  }
  findById(id: string): Court | undefined {
    return Array.from(this.clubs).find((club) => club.id === id);
  }
}
