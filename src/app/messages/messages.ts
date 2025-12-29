import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor, DatePipe],
  template: `
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">Tous les messages</h2>

    <div class="bg-white rounded-xl shadow divide-y">

      <div *ngFor="let msg of messages"
           class="p-4 hover:bg-gray-50 cursor-pointer">

        <p class="font-medium text-gray-800">
          {{ msg.name }} — {{ msg.email }}
        </p>

        <p class="text-gray-600 mt-1">
          {{ msg.message }}
        </p>

        <span class="text-sm text-gray-400">
          {{ msg.createdAt?.toDate() | date:'short' }}
        </span>

      </div>

    </div>
  </div>
  `
})
export class Messages implements OnInit {

  messages: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const q = query(
      collection(this.firestore, 'messages'),
      orderBy('createdAt', 'desc')
    );

    collectionData(q, { idField: 'id' }).subscribe(data => {
      this.messages = data;
    });
  }
}
