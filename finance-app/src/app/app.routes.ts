import { Routes } from '@angular/router';
import { TransactionForm } from './transaction-form/transaction-form';
import { LoginPage } from './login-page/login-page';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard-service';

export const routes: Routes = [
  {path: 'transactions', component: TransactionForm, canActivate:[AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPage},
  { path: '**', redirectTo: '/login' }
];
