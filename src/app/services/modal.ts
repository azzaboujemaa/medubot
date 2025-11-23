// src/app/modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Modal {
  private _showSignIn = new BehaviorSubject<boolean>(false);
  private _showCreateAccount = new BehaviorSubject<boolean>(false);

  showSignIn$ = this._showSignIn.asObservable();
  showCreateAccount$ = this._showCreateAccount.asObservable();

  // Sign In
  openSignIn() {
    this._showSignIn.next(true);
    this._showCreateAccount.next(false);
  }
  closeSignIn() {
    this._showSignIn.next(false);
  }

  // Create Account
  openCreateAccount() {
    this._showCreateAccount.next(true);
    this._showSignIn.next(false);
  }
  closeCreateAccount() {
    this._showCreateAccount.next(false);
  }

  // Fermer toutes les modales
  closeAll() {
    this._showSignIn.next(false);
    this._showCreateAccount.next(false);
  }
}