import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../../models/expense';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'http://localhost:3000/expenses';  // URL del tuo json-server

  constructor(private http: HttpClient) { }

  getExpensesPaginated(page: number, rows: number): Observable<Expense[]> {
    // Aggiungi i parametri di paginazione
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', rows.toString());

    return this.http.get<Expense[]>(this.apiUrl, { params });
  }
}
