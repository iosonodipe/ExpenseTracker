import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';  // Importa PaginatorState
import { TransactionsService } from './transactions.service';
import { Expense } from '../../models/expense';
import { Account } from '../../models/account';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  expenses: Expense[] = [];
  accounts: Account[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.loadExpenses();
    this.loadAccounts();
    console.log(this.accounts);

  }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 10;
    this.loadExpenses();  // Carica le spese quando la pagina cambia
  }

  loadExpenses() {
    const currentPage = this.first / this.rows + 1;

    this.transactionsService.getExpensesPaginated(currentPage, this.rows).subscribe(
      (data) => {
        this.expenses = data.expenses;
        this.totalRecords = data.totalRecords;  // Imposta il numero totale di record (in futuro, puoi farlo dinamicamente)
      },
      (error) => {
        console.error('Errore durante il caricamento delle spese', error);
      }
    );
  }

  loadAccounts(){
    this.transactionsService.getAccounts().subscribe(data => this.accounts = data);
  }

    // Formatta l'importo con il simbolo meno o più
    formatAmount(amount: number, causal: number): string {
      if (causal >= 1 && causal <= 19) {
        return `- ${amount.toFixed(2)} €`;
      } else if (causal >= 20) {
        return `+ ${amount.toFixed(2)} €`;
      } else {
        return `${amount.toFixed(2)} €`; // Caso di default
      }
    }

    formatAccount(account: number): string {
      const foundAccount = this.accounts.find(a => a.id === account);
      return foundAccount ? foundAccount.name : 'Nessun conto trovato';
    }
}
