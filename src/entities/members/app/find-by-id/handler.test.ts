import { CreateMemberCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When finding a member by id", () => {
  const repository: RepositoryInMemory = new RepositoryInMemory();
  const handler = new Handler(repository);
  const command: CreateMemberCommand = {
    name: "name",
    email: "email",
    username: "username",
    password: "password",
    money: 0,
    type: 0,
  };
  beforeEach(() => {
    repository.save({
      id: "id",
      name: command.name,
      email: command.email,
      username: command.username,
      password: command.password,
      money: command.money,
      type: command.type,
    });
  });
  it("should find a member by id", async () => {
    const member = await handler.handle("id");
    expect(member).toBeDefined();
    expect(member?.id).toBe("id");
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
