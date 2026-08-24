import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Calculation {
  id?: number;
  bill_amount: number;
  tip_percentage: number;
  number_of_people: number;
  total_amount?: number;
  amount_per_person?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = 'http://127.0.0.1:8000/api/calculations';

  private billAmount = new BehaviorSubject<number>(0);
  private tipPercentage = new BehaviorSubject<number>(0);
  private numberOfPeople = new BehaviorSubject<number>(1);

  billAmount$ = this.billAmount.asObservable();
  tipPercentage$ = this.tipPercentage.asObservable();
  numberOfPeople$ = this.numberOfPeople.asObservable();

  constructor(private http: HttpClient) {}

  updateBill(amount: number) { this.billAmount.next(amount); }
  updateTip(percentage: number) { this.tipPercentage.next(percentage); }
  updatePeople(count: number) { this.numberOfPeople.next(count); }

  saveCalculation(calc: Calculation): Observable<Calculation> {
    return this.http.post<Calculation>(this.apiUrl, calc);
  }

  getHistory(): Observable<Calculation[]> {
    return this.http.get<Calculation[]>(this.apiUrl);
  }
}