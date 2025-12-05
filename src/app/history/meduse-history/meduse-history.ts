import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meduse-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './meduse-history.html',
  styleUrl: './meduse-history.css',
})
export class MeduseHistory {
  meduses = [
    { image: 'assets/images/04.jpg', confidence: 97, time: '14:32' },
    { image: 'assets/images/65.jpg', confidence: 92, time: '13:50' }
  ];

}
