import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-system-events',
  imports: [FormsModule, CommonModule],
  templateUrl: './system-events.html',
  styleUrl: './system-events.css',
})
export class SystemEvents {
 events = [
    { message: 'Perte du signal GPS', time: '14:31' },
    { message: 'Pompe bloquée - intervention nécessaire', time: '14:10' },
    { message: 'Eau trop trouble : visibilité réduite', time: '13:55' }
  ];
}
