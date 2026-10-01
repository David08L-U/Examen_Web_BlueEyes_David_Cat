import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { YugiohResponse, Card } from '../interfaces/yugioh.interface'; 

@Injectable({
  providedIn: 'root'
})
export class YugiohService {
  private apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
  
  // En Angular moderno se prefiere inject()
  private http = inject(HttpClient); 

  
  // Búsqueda de cartas (completa o parcial)
  searchCardsByName(name: string): Observable<Card[]> {
    // La API de YGOPRODeck utiliza 'fname' para coincidencias parciales de nombre
    return this.http.get<YugiohResponse>(`${this.apiUrl}?fname=${name}`)
      .pipe(
        map(response => response.data)
      );
  }

  
  
  // Colección de cartas del arquetipo Blue-Eyes
  getBlueEyesCollection(): Observable<Card[]> {
    // La API utiliza 'archetype' para filtrar por arquetipos específicos
    return this.http.get<YugiohResponse>(`${this.apiUrl}?archetype=Blue-Eyes`)
      .pipe(
        map(response => response.data)
      );
  }
}