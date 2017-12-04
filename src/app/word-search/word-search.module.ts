import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSearchService } from './word-search.service';
import { WordSearchComponent } from './word-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WordSearchComponent,
  ],
  exports: [
    WordSearchComponent,
  ],
  providers: [
    WordSearchService,
  ]
})
export class WordSearchModule { }
