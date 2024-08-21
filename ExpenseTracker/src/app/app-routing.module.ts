import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) }, { path: 'pages/transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) }, { path: 'transactions', loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule) }, { path: 'statement', loadChildren: () => import('./pages/statement/statement.module').then(m => m.StatementModule) }, { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
