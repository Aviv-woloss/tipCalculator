import { Component } from '@angular/core';
import { InputFormComponent } from './input-form/input-form';
import { TipSelectorComponent } from './tip-selector/tip-selector';
import { SummaryViewComponent } from './summary-view/summary-view';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputFormComponent, TipSelectorComponent, SummaryViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'frontend';
}