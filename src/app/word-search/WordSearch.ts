import { WordDirection } from './WordDirection';
import { LetterGrid } from './Grid';
import { GridPosition } from './GridPosition';
import { Range1D, Range2D } from './DimensionalRange';
import { randomInteger } from './helpers';



export class WordConfiguration {
  constructor(public startingPosition: GridPosition, public direction: WordDirection) {}
}


export class WordSearch {
  public static Errors = {
    CannotInsertWord: new Error('Cannot insert word'),
    WordCollision: new Error('Word collision'),
    InvalidDimensions: LetterGrid.Errors.InvalidDimensions,
  };

  private grid: LetterGrid;
  private words: string[];

  constructor(width: number, height: number) {
    this.grid = new LetterGrid(width, height);
  }

  public letter(x: number, y: number): string {
    return this.grid.get(new GridPosition(x, y));
  }

  public extract(start: GridPosition, end: GridPosition): string {
    let word = '';
    this.grid.for(start, end, (letter: string) => {
      word += letter;
    });
    return word;
  }

  public startingRange(word: string, direction: WordDirection): Range2D {
    const L = word.length;
    const xRange = new Range1D(this.grid.width, direction.deltaX, L);
    const yRange = new Range1D(this.grid.height, direction.deltaY, L);
    return new Range2D(xRange, yRange);
  }

  public possibleConfigurationsInDirection(word: string, direction: WordDirection): WordConfiguration[] {
    word = word.toUpperCase();
    const startingRange = this.startingRange(word, direction);
    const possiblePositions = this.grid.emptyOrMatchingPositionsIn(word.charAt(0), startingRange);
    return possiblePositions.map(p => new WordConfiguration(p, direction));
  }

  public possibleConfigurationsInDirections(word: string, directions: WordDirection[]): WordConfiguration[] {
    let configs: WordConfiguration[] = [];
    for (const direction of directions) {
      configs = configs.concat(this.possibleConfigurationsInDirection(word, direction));
    }
    return configs;
  }

  public allPossibleConfigurations(word: string): WordConfiguration[] {
    const directions = this.potentialDirections(word);
    return this.possibleConfigurationsInDirections(word, directions);
  }

  public potentialDirections(word: string): WordDirection[] {
    const L = word.length;
    const isTooWide = L > this.grid.width;
    const isTooTall = L > this.grid.height;
    let potentialDirections: WordDirection[];

    if (isTooWide && isTooTall) {
      potentialDirections = [];
    } else if (isTooWide) {
      potentialDirections = WordDirection.OnlyVertical;
    } else if (isTooTall) {
      potentialDirections = WordDirection.OnlyHorizontal;
    } else {
      potentialDirections = WordDirection.All;
    }

    return potentialDirections;
  }

  public autoInsert(word: string): void {
    const possibleConfigs = this.allPossibleConfigurations(word);

    while (possibleConfigs.length > 0) {
      try {
        const iRemove = randomInteger(possibleConfigs.length);
        const [ config ] = possibleConfigs.splice(iRemove, 1);
        this.insert(word, config);
        return;
      } catch (error) {}
    }

    throw WordSearch.Errors.CannotInsertWord;
  }

  public insert(word: string, configuration: WordConfiguration): void {
    let position = configuration.startingPosition;
    for (const letter of word) {
      const existingLetter = this.grid.get(position);
      if (existingLetter && existingLetter !== letter) {
        throw WordSearch.Errors.WordCollision;
      }
      position = position.moved(configuration.direction);
    }

    this.steamroll(word, configuration);
  }

  public steamroll(word: string, configuration: WordConfiguration): void {
    word = word.toUpperCase();
    let position = configuration.startingPosition;
    for (const letter of word) {
      this.grid.set(position, letter);
      position = position.moved(configuration.direction);
    }
  }

  public finishGenerating(): void {
    this.grid.fillRemainder();
  }

  public generate(words: string[]): string[] {
    const inserted = [];
    for (const word of words) {
      try {
        this.autoInsert(word);
        inserted.push(word);
      } catch (error) {}
    }
    this.finishGenerating();
    return inserted;
  }

  public toString(): string {
    return this.grid.toString();
  }
}

