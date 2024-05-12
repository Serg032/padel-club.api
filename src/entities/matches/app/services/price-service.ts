export class PriceService {
  private pricePerHour: number;
  private pricePerHourAndAHalf: number;
  private pricePerTwoHours: number;

  constructor() {
    this.pricePerHourAndAHalf = 28;
    this.pricePerHour = this.pricePerHourAndAHalf / 1.5;
    this.pricePerTwoHours = this.pricePerHour * 2;
  }

  get pricePerOneHour(): Price {
    return this.pricePerHour;
  }

  get pricePerOneHourAndAHalf(): Price {
    return this.pricePerHourAndAHalf;
  }

  get pricePerOneTwoHours(): Price {
    return this.pricePerTwoHours;
  }

  public calculatePrice(start: number, end: number): number {
    const durationInMilliseconds = end - start;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

    if (durationInHours <= 1) {
      return this.pricePerHour;
    } else if (durationInHours <= 1.5) {
      return this.pricePerHourAndAHalf;
    } else {
      return this.pricePerTwoHours;
    }
  }
}

type Price = number;
