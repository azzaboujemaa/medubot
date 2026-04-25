import {
  Component, OnInit, OnDestroy,
  ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  getFirestore, collection, addDoc, onSnapshot,
  orderBy, query, serverTimestamp,
  updateDoc, doc
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

interface Message {
  id: string;
  text: string;
  senderRole: string;
  timestamp: any;
  read: boolean;
}

@Component({
  selector: 'app-tech-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  messages: Message[] = [];
  newMessage = '';
  loading = true;

  private shouldScroll = false;

  private db = getFirestore(getApp());
  private auth = getAuth(getApp());
  private unsubscribe: any = null;

  private ADMIN_UID = 'mtiUdBvjUeU5B69O3T8fmHzUAkO2';

  currentUser: any = null;
  convId: string | null = null;

  // ✅ fonction convId IDENTIQUE
  getConvId(uid1: string, uid2: string) {
    return uid1 < uid2
      ? `${uid1}_${uid2}`
      : `${uid2}_${uid1}`;
  }

  ngOnInit() {
    // 🔥 attendre auth
    const interval = setInterval(() => {
      if (this.auth.currentUser) {
        this.currentUser = this.auth.currentUser;
        this.convId = this.getConvId(this.ADMIN_UID, this.currentUser.uid);

        console.log("convId TECH:", this.convId);

        this.listenMessages();
        clearInterval(interval);
      }
    }, 200);
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  // 🔥 écouter messages
  listenMessages() {
    if (!this.convId) return;

    const q = query(
      collection(this.db, `chats/${this.convId}/messages`),
      orderBy('timestamp', 'asc')
    );

    this.unsubscribe = onSnapshot(q, (snap) => {

      this.messages = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      } as Message));

      this.loading = false;
      this.shouldScroll = true;

      // ✅ marquer admin comme lus
      snap.docs.forEach(async d => {
        const data = d.data();
        if (data['senderRole'] === 'ADMIN' && !data['read']) {
          await updateDoc(
            doc(this.db, `chats/${this.convId}/messages`, d.id),
            { read: true }
          );
        }
      });
    });
  }

  // 🔥 envoyer message
  async sendMessage() {
    if (!this.newMessage.trim() || !this.currentUser || !this.convId) return;

    const text = this.newMessage.trim();
    this.newMessage = '';

    try {
      await addDoc(
        collection(this.db, `chats/${this.convId}/messages`),
        {
          text,
          senderId: this.currentUser.uid,
          senderName:
            this.currentUser.displayName ||
            this.currentUser.email,
          senderRole: 'EMPLOYEE',
          timestamp: serverTimestamp(),
          read: false,
        }
      );
    } catch (e) {
      console.warn('Send error:', e);
    }
  }

  scrollToBottom() {
    try {
      const el = this.scrollContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  formatTime(ts: any): string {
    if (!ts?.toDate) return '';
    return ts.toDate().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}