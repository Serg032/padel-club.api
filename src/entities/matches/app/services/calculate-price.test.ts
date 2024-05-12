import { PriceService } from "./price-service";

describe("When calculating the price", () => {
  const priceService = new PriceService();
  const oneHourMatch = {
    start: new Date("2024-05-12T10:00:00").getTime(),
    end: new Date("2024-05-12T11:00:00").getTime(),
  };
  const ourAndAHalfMatch = {
    start: new Date("2024-05-12T10:00:00").getTime(),
    end: new Date("2024-05-12T11:30:00").getTime(),
  };
  const twoHourMatch = {
    start: new Date("2024-05-12T10:00:00").getTime(),
    end: new Date("2024-05-12T12:00:00").getTime(),
  };

  describe("When the match is 1 hour long", () => {
    it("should return the price per one hour", () => {
      const price = priceService.calculatePrice(
        oneHourMatch.start,
        oneHourMatch.end
      );
      expect(price).toBe(priceService.pricePerOneHour);
    });
  });
  describe("When the match is 1 hour and a half long", () => {
    it("should return the price per one hour and a half", () => {
      const price = priceService.calculatePrice(
        ourAndAHalfMatch.start,
        ourAndAHalfMatch.end
      );
      expect(price).toBe(priceService.pricePerOneHourAndAHalf);
    });
  });
  describe("When the match is 2 hours long", () => {
    it("should return the price per two hours", () => {
      const price = priceService.calculatePrice(
        twoHourMatch.start,
        twoHourMatch.end
      );
      expect(price).toBe(priceService.pricePerOneTwoHours);
    });
  });
});
