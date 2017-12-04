import { WordDirection } from './WordDirection';



export class GridPosition {
  constructor(private _x: number, private _y: number) {}

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public equalsXY(x: number, y: number): boolean {
    return this.x === x && this.y === y;
  }

  public equals(that: GridPosition): boolean {
    return this.x === that.x && this.y === that.y;
  }

  public moved(direction: WordDirection): GridPosition {
    return new GridPosition(this.x + direction.deltaX, this.y + direction.deltaY);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
