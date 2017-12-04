import { GridPosition } from './GridPosition';
import { Range2D } from './DimensionalRange';
import { randomInteger } from './helpers';



export class LetterGrid {
  public static Errors = {
    InvalidDimensions: new Error('Both dimensions of the grid must be positive'),
  };

  private static CodeA = 'A'.charCodeAt(0);

  private data: string[];
  private positions: GridPosition[];

  constructor(
    private _width: number,
    private _height: number,
  ) {
    if (_width < 1 || _height < 1) {
      throw LetterGrid.Errors.InvalidDimensions;
    }
    const N = _width * _height;
    this.data = new Array<string>(N);
    this.positions = new Array<GridPosition>(N);
    for (let i = 0; i < N; i++) {
      this.positions[i] = this.positionForIndex(i);
    }
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public static randomLetter(): string {
    return String.fromCharCode(LetterGrid.CodeA + randomInteger(26));
  }

  // 5 6 7 8 9
  // 0 1 2 3 4
  private indexForPosition(p: GridPosition): number {
    return p.x + p.y * this._width;
  }

  private positionForIndex(i: number): GridPosition {
    return new GridPosition(i % this.width, Math.floor(i / this.width));
  }

  public get(p: GridPosition): string {
    return this.data[this.indexForPosition(p)];
  }

  public set(p: GridPosition, letter: string): void {
    this.data[this.indexForPosition(p)] = letter;
  }

  public fillRemainder(): void {
    const N = this.data.length;
    for (let i = 0; i < N; i++) {
      if (!this.data[i]) {
        this.data[i] = LetterGrid.randomLetter();
      }
    }
  }

  public get allPositions(): GridPosition[] {
    return this.positions;
  }

  public emptyPositionsIn(range: Range2D): GridPosition[] {
    return this.positions.filter(p => range.contains(p) && !this.get(p));
  }

  public emptyOrMatchingPositionsIn(letter: string, range: Range2D): GridPosition[] {
    return this.positions.filter(p => range.contains(p) && (!this.get(p) || this.get(p) === letter));
  }

  public randomEmptyPositionIn(range: Range2D): GridPosition {
    const empties = this.emptyPositionsIn(range);
    return empties[randomInteger(empties.length)];
  }

  public toString(): string {
    let str = '';
    for (let y = this.height - 1; y >= 0; y--) {
      str += this.rowString(y) + '\n';
    }
    return str;
  }

  public rowString(y: number): string {
    let str = '';
    for (let x = 0; x < this.width; x++) {
      str += this.get(new GridPosition(x, y)) + ' ';
    }
    return str;
  }
}
