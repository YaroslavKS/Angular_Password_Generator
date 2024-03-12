import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-options',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-options.component.html',
  styleUrls: ['./password-options.component.css']
})
export class PasswordOptionsComponent {
  @Output() optionsChange = new EventEmitter<{ length: number, options: any }>();
  
  optionsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.optionsForm = this.formBuilder.group({
      length: [12],
      lowercase: [true],
      uppercase: [false],
      numbers: [false],
      symbols: [false],
      excludeDuplicate: [false],
      includeSpaces: [false]
    });
    this.optionsForm.valueChanges.subscribe(() => this.emitOptions());
  }

  emitOptions(): void {
    this.optionsChange.emit({ length: this.optionsForm.value.length, options: this.optionsForm.value });
  }
}
