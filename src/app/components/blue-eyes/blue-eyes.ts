import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YugiohService } from '../../services/yugioh'; 
import { Card, CardSet } from '../../interfaces/yugioh.interface';
import { CardComponent } from '../card/card';
import { CardDetailComponent } from '../card-detail/card-detail';

@Component({
  selector: 'app-blue-eyes',
  standalone: true,
  imports: [CommonModule, CardComponent, CardDetailComponent],
  templateUrl: './blue-eyes.html',
  styleUrls: ['./blue-eyes.css']
})
export class BlueEyesComponent implements OnInit {
  private yugiohService = inject(YugiohService);
  
  allBlueEyesCards: Card[] = [];
  filteredCards: Card[] = [];
  uniqueSets: CardSet[] = [];
  
  selectedCard: Card | null = null;
  status: 'loading' | 'success' | 'empty' | 'error' = 'loading';

  ngOnInit() {
    this.yugiohService.getBlueEyesCollection().subscribe({
      next: (cards) => {
        this.allBlueEyesCards = cards;
        this.filteredCards = cards; 
        this.extractUniqueSets(cards);
        this.status = cards.length > 0 ? 'success' : 'empty';
      },
      error: (err) => {
        console.error('Error al cargar Blue-Eyes', err);
        this.status = 'error';
      }
    });
  }

  private extractUniqueSets(cards: Card[]) {
    const setMap = new Map();
    
    cards.forEach(card => {
      if (card.card_sets) {
        card.card_sets.forEach(set => {
          if (!setMap.has(set.set_name)) {
            setMap.set(set.set_name, set);
          }
        });
      }
    });
    
    this.uniqueSets = Array.from(setMap.values());
  }

  filterBySet(event: Event) {
    const setName = (event.target as HTMLSelectElement).value;
    
    if (!setName) {
      this.filteredCards = this.allBlueEyesCards;
    } else {
      this.filteredCards = this.allBlueEyesCards.filter(card => 
        card.card_sets && card.card_sets.some(set => set.set_name === setName)
      );
    }

    this.status = this.filteredCards.length > 0 ? 'success' : 'empty';
    this.selectedCard = null; // Close detail view when filter changes
  }
}