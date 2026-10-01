import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../interfaces/yugioh.interface';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail.html',
  styleUrls: ['./card-detail.css']
})
export class CardDetailComponent {
  @Input({ required: true }) card!: Card;
  // Este evento nos permitirá avisarle al componente padre que cierre esta vista
  @Output() close = new EventEmitter(); 
}