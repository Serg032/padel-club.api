import { Club } from "../../clubs/domain";

export abstract class Repository {
  clubs: Set<Club> = new Set();
  abstract save(club: Club): void;
}
