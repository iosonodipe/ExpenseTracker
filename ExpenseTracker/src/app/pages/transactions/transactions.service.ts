import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Expense } from '../../models/expense';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'http://localhost:3000/expenses';  // URL del tuo json-server

  constructor(private http: HttpClient) { }

  getExpensesPaginated(page: number, rows: number): Observable<{ expenses: Expense[], totalRecords: number }> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', rows.toString())
      .set('_sort', 'id')  // Sostituisci 'id' con il campo che vuoi usare per l'ordinamento
      .set('_order', 'desc');  // Ordina in ordine decrescente

    return this.http.get<Expense[]>(this.apiUrl, { params, observe: 'response' }).pipe(
      map(response => {
        const totalRecords = Number(response.headers.get('X-Total-Count'));  // Leggi l'intestazione
        const expenses = response.body || [];
        return { expenses, totalRecords };
      })
    );
  }


}
