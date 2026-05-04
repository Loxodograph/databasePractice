import { Routes } from '@angular/router';
import { TransactionForm } from './transaction-form/transaction-form';

export const routes: Routes = [
  {path: 'transactions', component: TransactionForm},
];
