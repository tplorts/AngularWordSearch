import { Component, OnInit } from '@angular/core';
import { Logger } from '../core/logger.service';

import { WordSearchService } from './word-search.service';
import { WordSearch } from './WordSearch';
import { GridPosition } from './GridPosition';
import { Grid } from './Grid';
import { integerSequence } from './helpers';



const log = new Logger('WordSearch');



@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.scss']
})
export class WordSearchComponent implements OnInit {

  public rows: number[];
  public columns: number[];
  private wordSearch: WordSearch;
  private _insertedWords: string[];
  private _pendingWords: string[];
  private _discoveredWords: string[];
  private selectedPosition: GridPosition;
  private discoveryGrid: Grid<boolean>;

  constructor(private wordSearchService: WordSearchService) {
    this.selectedPosition = null;

    const h = 8;
    const w = 12;
    this.discoveryGrid = new Grid<boolean>(w, h);
    this.discoveryGrid.setAll(() => false);
    this.rows = integerSequence(h).reverse();
    this.columns = integerSequence(w);
    this.wordSearch = new WordSearch(w, h);
    const words = ['astrobleme', 'bruxism', 'clepsydra', 'degust', 'etui', 'flocculent'];
    this._insertedWords = this.wordSearch.generate(words);

    this._pendingWords = [...this._insertedWords];
    this._discoveredWords = [];
  }

  ngOnInit() {
  }

  public get insertedWords(): string[] {
    return this._insertedWords;
  }

  public get pendingWords(): string[] {
    return this._pendingWords;
  }

  public get discoveredWords(): string[] {
    return this._discoveredWords;
  }

  public letter(row: number, column: number): string {
    return this.wordSearch.letter(column, row);
  }

  public discoverWord(word: string): boolean {
    const i = this.pendingWords.findIndex(s => s.toUpperCase() === word.toUpperCase());
    if (i < 0) {
      return false;
    }
    const [w] = this._pendingWords.splice(i, 1);
    this._discoveredWords.push(w);
    return true;
  }

  public select(row: number, column: number) {
    const start = this.selectedPosition;
    if (start) {
      this.selectedPosition = null;
      const end = new GridPosition(column, row);
      const word = this.wordSearch.extract(start, end);
      log.debug('selected:', word);
      if (word && this.discoverWord(word)) {
        log.debug('found:', word);
        this.markDiscovered(start, end);
      }
    } else {
      this.selectedPosition = new GridPosition(column, row);
    }
  }

  public markDiscovered(start: GridPosition, end: GridPosition): void {
    this.discoveryGrid.for(start, end, (_, pos) => { this.discoveryGrid.set(pos, true); });
  }

  public isSelected(row: number, column: number): boolean {
    return this.selectedPosition && this.selectedPosition.equalsXY(column, row);
  }

  public isDiscovered(row: number, column: number): boolean {
    return this.discoveryGrid.get(new GridPosition(column, row));
  }
}
