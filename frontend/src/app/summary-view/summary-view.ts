import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CalculatorService, Calculation } from '../calculator';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-summary-view',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './summary-view.html',
  styleUrl: './summary-view.css'
})
export class SummaryViewComponent implements OnInit, OnDestroy {
  billAmount = 0;
  tipPercentage = 0;
  numberOfPeople = 1;

  tipAmount = 0;
  totalAmount = 0;
  amountPerPerson = 0;

  private sub!: Subscription;

  constructor(
    private calculatorService: CalculatorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = combineLatest([
      this.calculatorService.billAmount$,
      this.calculatorService.tipPercentage$,
      this.calculatorService.numberOfPeople$
    ]).subscribe(([bill, tip, people]) => {
      this.billAmount = bill;
      this.tipPercentage = tip;
      this.numberOfPeople = people;
      this.calculate();
      
      this.cdr.detectChanges();
    });
  }

  calculate() {
    this.tipAmount = this.billAmount * (this.tipPercentage / 100);
    this.totalAmount = this.billAmount + this.tipAmount;
    this.amountPerPerson = this.totalAmount / this.numberOfPeople;
  }

  save() {
    const calc: Calculation = {
      bill_amount: this.billAmount,
      tip_percentage: this.tipPercentage,
      number_of_people: this.numberOfPeople
    };
    
    this.calculatorService.saveCalculation(calc).subscribe({
      next: (res) => alert('Calculation saved successfully to the Database! '),
      error: (err) => console.error('Error saving:', err)
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}