import { GridPosition } from './GridPosition';



export class Range1D {
  public from: number;
  public to: number;

  public static AllOf(size: number) {
    return new Range1D(size, 0, 1);
  }

  constructor(
    maxSpan: number,
    delta: number,
    size: number,
  ) {
    this.from = 0;
    this.to = maxSpan - 1;

    if (delta < 0) {
      this.from += size - 1;
    } else if (delta > 0) {
      this.to -= size - 1;
    }
  }

  contains(x: number): boolean {
    return this.from <= x && x <= this.to;
  }
}



export class Range2D {

  public static AllOf(width: number, height: number): Range2D {
    return new Range2D(Range1D.AllOf(width), Range1D.AllOf(height));
  }
  constructor(public xRange: Range1D, public yRange: Range1D) {}

  contains(p: GridPosition): boolean {
    return this.xRange.contains(p.x) && this.yRange.contains(p.y);
  }
}
