import { Component } from '@angular/core';
import { CalculatorService } from '../calculator';

@Component({
  selector: 'app-tip-selector',
  standalone: true,
  imports: [],
  templateUrl: './tip-selector.html',
  styleUrl: './tip-selector.css'
})
export class TipSelectorComponent {
  tipPercentages: number[] = [10, 15, 20];
  selectedTip: number = 0;

  constructor(private calculatorService: CalculatorService) {}

  selectTip(percentage: number) {
    this.selectedTip = percentage;
    this.calculatorService.updateTip(percentage);
  }
}