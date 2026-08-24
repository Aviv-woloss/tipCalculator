import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../calculator';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-form.html',
  styleUrl: './input-form.css'
})
export class InputFormComponent {
  bill: number = 0;
  people: number = 1;

  constructor(private calculatorService: CalculatorService) {}

  onBillChange() {
    this.calculatorService.updateBill(Number(this.bill) || 0);
  }

  onPeopleChange() {
    const peopleCount = Number(this.people) > 0 ? Number(this.people) : 1;
    this.calculatorService.updatePeople(peopleCount);
  }
}