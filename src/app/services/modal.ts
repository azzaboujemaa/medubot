import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Modal {

  // 🔐 Auth / Account
  private _showSignIn = new BehaviorSubject<boolean>(false);
  private _showCreateAccount = new BehaviorSubject<boolean>(false);

  // 🤝 Partner modal
  private _showPartner = new BehaviorSubject<boolean>(false);

  // ✏️ Edit Employee
  private _editEmployee = new BehaviorSubject<any | null>(null);

  // 🔎 Observables
  showSignIn$ = this._showSignIn.asObservable();
  showCreateAccount$ = this._showCreateAccount.asObservable();
  showPartner$ = this._showPartner.asObservable();
  editEmployee$ = this._editEmployee.asObservable();

  // ======================
  // 🔐 SIGN IN
  // ======================
  openSignIn() {
    this._showSignIn.next(true);
    this._showCreateAccount.next(false);
    this._showPartner.next(false);
    this._editEmployee.next(null);
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
  }
}
