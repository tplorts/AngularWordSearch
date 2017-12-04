import { unitScalar } from './helpers';



export class WordDirection {
  public static All = [
    [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]
  ].map(([dx, dy]) => new WordDirection(dx, dy));

  public static OnlyHorizontal = WordDirection.All.filter(d => d.deltaY === 0);
  public static OnlyVertical = WordDirection.All.filter(d => d.deltaX === 0);

  private _deltaX: number;
  private _deltaY: number;

  constructor(_deltaX: number, _deltaY: number) {
    this._deltaX = unitScalar(_deltaX);
    this._deltaY = unitScalar(_deltaY);
  }

  public get deltaX(): number {
    return this._deltaX;
  }

  public get deltaY(): number {
    return this._deltaY;
  }

  public reverse(): WordDirection {
    return new WordDirection(-this.deltaX, -this.deltaY);
  }
}
