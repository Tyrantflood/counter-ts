export interface CounterOptions {
  initial?: number;
  step?: number;
  min?: number;
  max?: number;
}

export class Counter {
  private value: number;
  private readonly initial: number;
  private readonly step: number;
  private readonly min: number;
  private readonly max: number;

  constructor({ initial = 0, step = 1, min = -Infinity, max = Infinity }: CounterOptions = {}) {
    if (step <= 0) throw new RangeError("step must be positive");
    if (min > max) throw new RangeError("min cannot be greater than max");
    if (initial < min || initial > max) throw new RangeError("initial must be within [min, max]");
    this.initial = initial;
    this.value = initial;
    this.step = step;
    this.min = min;
    this.max = max;
  }

  get count(): number {
    return this.value;
  }

  increment(): number {
    this.value = Math.min(this.value + this.step, this.max);
    return this.value;
  }

  decrement(): number {
    this.value = Math.max(this.value - this.step, this.min);
    return this.value;
  }

  reset(): number {
    this.value = this.initial;
    return this.value;
  }
}
