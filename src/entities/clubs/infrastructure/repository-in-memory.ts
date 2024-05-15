import { Club } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  clubs: Set<Club> = new Set();
  async save(club: Club): Promise<void> {
    this.clubs.add(club);
  }
  async findById(id: string): Promise<Club | undefined> {
    return Array.from(this.clubs).find((club) => club.id === id);
  }
}
