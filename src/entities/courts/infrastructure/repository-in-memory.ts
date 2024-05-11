import { Club } from "../../clubs/domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  save(club: Club): void {
    this.clubs.add(club);
  }
}
