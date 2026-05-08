import { Routes } from '@angular/router';
import { TransactionForm } from './transaction-form/transaction-form';
import { LoginPage } from './login-page/login-page';
import { AuthGuard } from './services/auth-guard';
import { CreateUser } from './create-user/create-user';
import { AccountChooser } from './account-chooser/account-chooser';

export const routes: Routes = [
  { path: 'transactions', component: TransactionForm, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'signUp', component: CreateUser },
  { path: 'accounts', component: AccountChooser, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login' },

];
