import { CreateCourtCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When creating a court", () => {
  const repository: RepositoryInMemory = new RepositoryInMemory();
  const handler = new Handler(repository);
  const command: CreateCourtCommand = {
    id: "id",
    name: "Club Name",
    clubId: "Club Address",
  };
  it("should create a court", () => {
    handler.handle(command);
    expect(repository.clubs.size).toBe(1);
    expect(repository.clubs.values().next().value.id).toBe(command.id);
    expect(repository.clubs.values().next().value.name).toBe(command.name);
    expect(repository.clubs.values().next().value.clubId).toBe(command.clubId);
  });
});
