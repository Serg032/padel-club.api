import { CreateClubCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When creating a club", () => {
  it("should create a club", () => {
    const clubName = "Club Name";
    const clubAddress = "Club Address";
    const id = "id";
    const command: CreateClubCommand = {
      id,
      name: clubName,
      address: clubAddress,
    };
    const repository: RepositoryInMemory = new RepositoryInMemory();
    const handler = new Handler(repository);
    handler.handle(command);
    expect(repository.clubs.size).toBe(1);
    expect(repository.clubs.values().next().value.id).toBe(id);
    expect(repository.clubs.values().next().value.name).toBe(clubName);
    expect(repository.clubs.values().next().value.address).toBe(clubAddress);
  });
});
