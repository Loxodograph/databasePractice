import { Routes } from '@angular/router';
import { TransactionForm } from './transaction-form/transaction-form';
import { LoginPage } from './login-page/login-page';
import {
  authGuardGuard as AuthGuard
} from './services/auth-guard-guard';
import { CreateUser } from './create-user/create-user';

export const routes: Routes = [
  { path: 'transactions', component: TransactionForm, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'signUp', component: CreateUser },
  { path: '**', redirectTo: '/login' },

];
