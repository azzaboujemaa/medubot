import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Modal {

  // 🔐 Auth / Account
  private _showSignIn = new BehaviorSubject<boolean>(false);
  private _showCreateAccount = new BehaviorSubject<boolean>(false);
private _showForgotPassword = new BehaviorSubject<boolean>(false);
  // 🤝 Partner modal
  private _showPartner = new BehaviorSubject<boolean>(false);
  private _editPartner = new BehaviorSubject<any | null>(null);
  // ✏️ Edit Employee
  private _editEmployee = new BehaviorSubject<any | null>(null);

  // 🔎 Observables
  showSignIn$ = this._showSignIn.asObservable();
  showCreateAccount$ = this._showCreateAccount.asObservable();
  showPartner$ = this._showPartner.asObservable();
  editEmployee$ = this._editEmployee.asObservable();
  editPartner$ = this._editPartner.asObservable();
  showForgotPassword$ = this._showForgotPassword.asObservable();
  // ======================
  // 🔐 SIGN IN
  // ======================
  openSignIn() {
    this._showSignIn.next(true);
    this._showCreateAccount.next(false);
    this._showPartner.next(false);
    this._editEmployee.next(null);
    this._showForgotPassword.next(false);
  }
  openPartner() {
  this._showPartner.next(true);
}
  closePartner() {
  this._showPartner.next(false);
}

  closeSignIn() {
    this._showSignIn.next(false);
  }

  // ======================
  // 👤 CREATE ACCOUNT
  // ======================
  openCreateAccount() {
    this._showCreateAccount.next(true);
    this._showSignIn.next(false);
    this._showPartner.next(false);
    this._editEmployee.next(null);
  }

  closeCreateAccount() {
    this._showCreateAccount.next(false);
  }

  // ======================
  // ✏️ EDIT EMPLOYEE
  // ======================
  openEditEmployee(employee: any) {
    this._editEmployee.next(employee);
    this._showSignIn.next(false);
    this._showCreateAccount.next(false);
    this._showPartner.next(false);
  }

  closeEditEmployee() {
    this._editEmployee.next(null);
  }

  // ======================
  // ❌ CLOSE ALL
  // ======================
  closeAll() {
    this._showSignIn.next(false);
    this._showCreateAccount.next(false);
    this._showPartner.next(false);
    this._editEmployee.next(null);
    this._showForgotPassword.next(false);

  }
openEditPartner(partner: any) {
  this._editPartner.next(partner);
  this._showPartner.next(false);
  this._editEmployee.next(null);
}

// FERMER
closeEditPartner() {
  this._editPartner.next(null);
}
// 🔐 FORGOT PASSWORD
openForgotPassword() {
  this._showForgotPassword.next(true);
  this._showSignIn.next(false);
  this._showCreateAccount.next(false);
}

closeForgotPassword() {
  this._showForgotPassword.next(false);
}



}
