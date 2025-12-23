import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Modal {
  private _showSignIn = new BehaviorSubject<boolean>(false);
  private _showCreateAccount = new BehaviorSubject<boolean>(false);
  private _showPartner = new BehaviorSubject<boolean>(false); // ✅ AJOUT

  showSignIn$ = this._showSignIn.asObservable();
  showCreateAccount$ = this._showCreateAccount.asObservable();
  showPartner$ = this._showPartner.asObservable(); // ✅ AJOUT

  // Sign In
  openSignIn() {
    this._showSignIn.next(true);
    this._showCreateAccount.next(false);
    this._showPartner.next(false);
  }
  closeSignIn() {
    this._showSignIn.next(false);
  }

  // Create Account
  openCreateAccount() {
    this._showCreateAccount.next(true);
    this._showSignIn.next(false);
    this._showPartner.next(false);
  }
  closeCreateAccount() {
    this._showCreateAccount.next(false);
  }

  // ✅ PARTNER
  openPartner() {
    this._showPartner.next(true);
    this._showSignIn.next(false);
    this._showCreateAccount.next(false);
  }
  closePartner() {
    this._showPartner.next(false);
  }

  // Fermer toutes les modales
  closeAll() {
    this._showSignIn.next(false);
    this._showCreateAccount.next(false);
    this._showPartner.next(false);
  }
}
