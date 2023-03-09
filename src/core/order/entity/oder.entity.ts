export class OderEntity {
  private getPercent(number: number, percent: number) {
    const decimalPercent = percent / 100;

    return number * decimalPercent;
  }
  getQuantityOfCurrency(currencyPrice: number, clientAmount: number, percent: number) {
    if (percent < 0 || percent > 100) {
      throw new Error("Percent value must be between 0 and 100");
    }
    const percentOfCurrencyPrice = this.getPercent(currencyPrice, percent);

    return clientAmount / (currencyPrice + percentOfCurrencyPrice);
  }
}
