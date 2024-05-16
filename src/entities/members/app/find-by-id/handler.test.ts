import { CreateMemberCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When finding a member by id", () => {
  const repository: RepositoryInMemory = new RepositoryInMemory();
  const handler = new Handler(repository);
  const command: CreateMemberCommand = {
    id: "id",
    name: "name",
    email: "email",
    username: "username",
    password: "password",
    money: 0,
    type: 0,
  };
  beforeEach(() => {
    repository.save(command);
  });
  it("should find a member by id", async () => {
    const member = await handler.handle(command.id ?? "");
    expect(member).toBeDefined();
    expect(member?.id).toBe(command.id);
    expect(member?.name).toBe(command.name);
    expect(member?.email).toBe(command.email);
    expect(member?.money).toBe(command.money);
    expect(member?.type).toBe(command.type);
  });
  describe("When the member does not exist", () => {
    it("should return undefined", async () => {
      const member = await handler.handle("non-existing-id");
      expect(member).toBeUndefined();
    });
  });
});
