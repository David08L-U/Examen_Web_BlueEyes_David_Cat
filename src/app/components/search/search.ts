import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { YugiohService } from '../../services/yugioh';
import { Card } from '../../interfaces/yugioh.interface';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, of, tap, merge, Subject } from 'rxjs';
import { CardComponent } from '../card/card';
import { CardDetailComponent } from '../card-detail/card-detail';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, CardDetailComponent],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  private yugiohService = inject(YugiohService);
  selectedCard: Card | null = null;
  
  cards: Card[] = [];
  status: 'idle' | 'loading' | 'success' | 'empty' | 'error' = 'idle';

  private manualSearch$ = new Subject<string | null>();

  ngOnInit() {
    // Reducimos el tiempo de espera a 250ms (era 500ms)
    const typingSearch$ = this.searchControl.valueChanges.pipe(
      debounceTime(250)
    );

    // Unimos la bsqueda por escritura y la manual (Enter)
    merge(typingSearch$, this.manualSearch$).pipe(
      distinctUntilChanged(),
      filter(value => value !== null && value.trim().length > 0),
      tap(() => {
        this.status = 'loading';
        this.selectedCard = null; // Close detail on new search
      }),
      switchMap(searchTerm => 
        this.yugiohService.searchCardsByName(searchTerm!).pipe(
          catchError(error => {
            if (error.status === 400) {
              this.status = 'empty';
            } else {
              console.error('Error en la API', error);
              this.status = 'error';
            }
            return of([]);
          })
        )
      )
    ).subscribe(results => {
      if (this.status !== 'error' && this.status !== 'empty') {
        this.cards = results;
        this.status = results.length > 0 ? 'success' : 'empty';
      } else if (this.status === 'empty') {
        this.cards = [];
      }
    });
  }

  // Funcin que se ejecuta al presionar Enter para saltarse el debounce
  onEnter() {
    const value = this.searchControl.value;
    if (value && value.trim().length > 0) {
      this.manualSearch$.next(value);
    }
  }
}
