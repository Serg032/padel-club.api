import { Court } from ".";
import { Club } from "../../clubs/domain";

export abstract class Repository {
  abstract save(club: Court): void;
  abstract findById(id: string): Court | undefined;
}
