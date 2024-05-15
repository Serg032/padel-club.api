import { CreateClubCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateClubHandler } from "../create/handler";
import { Handler } from "./handle";

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
    const club = handler.handle(createClubCommand.id || ""); // Ensure createClubCommand.id is always a string
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
