import { CreateCourtCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateCourtHandler } from "../create/handler";
import { Handler } from "./handler";

describe("When finding a court by id", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const createCourtHandler = new CreateCourtHandler(repository);
  const createCourtCommand: CreateCourtCommand = {
    id: "id",
    name: "Court Name",
    clubId: "Court Address",
  };
  beforeEach(async () => {
    await createCourtHandler.handle(createCourtCommand);
  });
  it("should find a court by id", async () => {
    const court = await handler.handle(createCourtCommand.id!); // Add the '!' operator to assert that createCourtCommand.id is not undefined
    expect(court).toBeDefined();
    expect(court?.id).toBe(createCourtCommand.id);
    expect(court?.name).toBe(createCourtCommand.name);
    expect(court?.clubId).toBe(createCourtCommand.clubId);
  });
  describe("When the court does not exist", () => {
    it("should return undefined", async () => {
      const court = await handler.handle("non-existing-id");
      expect(court).toBeUndefined();
    });
  });
});
