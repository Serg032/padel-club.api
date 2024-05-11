import { Club } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  clubs: Set<Club> = new Set();
  save(club: Club): void {
    this.clubs.add(club);
  }
  findById(id: string): Club | undefined {
    return Array.from(this.clubs).find((club) => club.id === id);
  }
}
