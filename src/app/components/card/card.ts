import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../interfaces/yugioh.interface'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'] // Opcional
})
export class CardComponent {
  // @Input permite recibir datos desde un componente padre (SearchComponent)
  @Input({ required: true }) card!: Card;
}