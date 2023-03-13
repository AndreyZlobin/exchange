export interface ICalculateService {
  floatPlus(...numbers: number[]): number;
}
export class CalculateService implements ICalculateService {
  private isNumber(value: unknown): boolean {
    return typeof value === 'number' && isFinite(value);
  }
  floatPlus(...numbers: number[]) {
    const toFixed = 8;
    const num = 100_000_000;
    const sum = numbers.reduce((acc, n) => {
      acc += Number(n) * num;
      if (this.isNumber(n)) {
        throw new Error(`Value ${n} is not a number`);
      }
      return acc;
    }, 0);

    return parseFloat((sum / num).toFixed(toFixed));
  }
}
