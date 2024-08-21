import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';  // Importa PaginatorState
import { TransactionsService } from './transactions.service';
import { Expense } from '../../models/expense';

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

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.loadExpenses();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 10;
    this.loadExpenses();  // Carica le spese quando la pagina cambia
  }

  loadExpenses() {
    const currentPage = this.first / this.rows + 1;

    this.transactionsService.getExpensesPaginated(currentPage, this.rows).subscribe(
      (expenses) => {
        this.expenses = expenses;
        this.totalRecords = 120;  // Imposta il numero totale di record (in futuro, puoi farlo dinamicamente)
      },
      (error) => {
        console.error('Errore durante il caricamento delle spese', error);
      }
    );
  }
}
