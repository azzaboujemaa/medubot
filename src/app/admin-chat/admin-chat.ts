import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  getFirestore,
  collection,
  collectionGroup,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  getDocs,
  where,
  updateDoc,
  doc,
  getDoc
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

interface Conversation {
  techId: string;
  techName: string;
  techEmail: string;
  convId: string;
  lastMsg: string;
  unread: number;
}

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-chat.html',
  styleUrls: ['./admin-chat.css']
})
export class AdminChat implements OnInit, OnDestroy {

  conversations: Conversation[] = [];
  selectedConv: Conversation | null = null;
  messages: Message[] = [];
  newMessage = '';

  private db = getFirestore(getApp());
  private auth = getAuth(getApp());

  private unsubMessages: any = null;
  private unsubConvs: any = null;

  get adminUid() {
    return this.auth.currentUser?.uid || null;
  }

  // ✅ fonction convId IDENTIQUE au mobile
  getConvId(uid1: string, uid2: string) {
    return uid1 < uid2
      ? `${uid1}_${uid2}`
      : `${uid2}_${uid1}`;
  }

  ngOnInit() {
    // attendre user chargé
    const interval = setInterval(() => {
      if (this.adminUid) {
        clearInterval(interval);
        this.loadConversations();
      }
    }, 200);
  }

  ngOnDestroy() {
    this.unsubMessages?.();
    this.unsubConvs?.();
  }

  // 🔥 Charger conversations
  async loadConversations() {

    const usersSnap = await getDocs(
      query(collection(this.db, 'employees'), where('role', '==', 'EMPLOYEE'))
    );

    const q = query(
      collectionGroup(this.db, 'messages'),
      where('senderRole', '==', 'EMPLOYEE'),
      where('read', '==', false)
    );

    this.unsubConvs = onSnapshot(q, (snap) => {

      const unreadByConv: Record<string, number> = {};

      snap.docs.forEach(d => {
        const convId = d.ref.parent.parent?.id || '';
        unreadByConv[convId] = (unreadByConv[convId] || 0) + 1;
      });

      this.conversations = usersSnap.docs.map(d => {
        const data = d.data();
        const techId = d.id;

        const convId = this.getConvId(this.adminUid!, techId);

        return {
          techId,
          techName: data['name'] || data['email'],
          techEmail: data['email'] || '',
          convId,
          lastMsg: '',
          unread: unreadByConv[convId] || 0,
        };
      });

      this.conversations.sort((a, b) => b.unread - a.unread);
    });
  }

  // 🔥 Sélection conversation
  selectConversation(conv: Conversation) {
    this.selectedConv = conv;
    this.unsubMessages?.();
    this.listenMessages(conv.convId);
  }

  // 🔥 Écoute messages
  listenMessages(convId: string) {
    const q = query(
      collection(this.db, `chats/${convId}/messages`),
      orderBy('timestamp', 'asc')
    );

    this.unsubMessages = onSnapshot(q, (snap) => {

      this.messages = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      } as Message));

      // ✅ dernier message
      if (this.selectedConv && this.messages.length > 0) {
        this.selectedConv.lastMsg =
          this.messages[this.messages.length - 1].text;
      }

      // ✅ marquer comme lus
      snap.docs.forEach(async d => {
        const data = d.data();
        if (data['senderRole'] === 'EMPLOYEE' && !data['read']) {
          await updateDoc(
            doc(this.db, `chats/${convId}/messages`, d.id),
            { read: true }
          );
        }
      });
    });
  }

  // 🔥 Envoyer message admin
  async sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConv) return;

    const text = this.newMessage.trim();
    this.newMessage = '';

    await addDoc(
      collection(this.db, `chats/${this.selectedConv.convId}/messages`),
      {
        text,
        senderId: this.adminUid,
        senderRole: 'ADMIN',
        timestamp: serverTimestamp(),
        read: false,
      }
    );

    await this.sendPushNotification(this.selectedConv.techId, text);
  }

  // 🔥 Notification push
  async sendPushNotification(techUid: string, message: string) {
    try {
      const userDoc = await getDoc(doc(this.db, 'users', techUid));
      const token = userDoc.data()?.['expoPushToken'];

      if (!token) return;

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: token,
          title: "💬 Message Admin",
          body: message,
        }),
      });

    } catch (e) {
      console.warn('Push error:', e);
    }
  }

  formatTime(ts: any): string {
    if (!ts?.toDate) return '';
    return ts.toDate().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}