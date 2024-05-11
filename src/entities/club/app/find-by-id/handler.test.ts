import { Club, CreateClubCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateClubHandler } from "../create/handler";

class Handler {
  constructor(private repository: Repository) {}

  handle(id: string): Club | undefined {
    return this.repository.findById(id);
  }
}

describe("When finding a club by id", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const createClubHandler = new CreateClubHandler(repository);
  const createClubCommand: CreateClubCommand = {
    id: "id",
    name: "Club Name",
    address: "Club Address",
  };
  beforeEach(() => {
    createClubHandler.handle(createClubCommand);
  });
  it("should find a club by id", () => {
    const club = handler.handle(createClubCommand.id);
    console.log(club);
    expect(club?.id).toBe(createClubCommand.id);
    expect(club?.name).toBe(createClubCommand.name);
    expect(club?.address).toBe(createClubCommand.address);
  });
  describe("When the club does not exist", () => {
    it("should return undefined", () => {
      const club = handler.handle("non-existing-id");
      expect(club).toBeUndefined();
    });
  });
});
