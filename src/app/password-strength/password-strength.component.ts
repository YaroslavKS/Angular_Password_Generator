import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PasswordStrengthService } from '../password-strength.service';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {
  @ViewChild('lengthSlider', { static: false }) lengthSlider!: ElementRef<HTMLInputElement>;
  @ViewChild('passIndicator', { static: false }) passIndicator!: ElementRef<HTMLDivElement>;

  passwordForm: FormGroup;
  generatedPassword: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private passwordStrengthService: PasswordStrengthService
  ) {
    this.passwordForm = this.formBuilder.group({
      password: [''],
      length: [15],
      lowercase: [true],
      uppercase: [false],
      numbers: [false],
      symbols: [false],
      excludeDuplicate: [false],
      includeSpaces: [false]
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.generatePassword();
    });
  }

  generatePassword(): void {
    const options = this.passwordForm.value;
    this.generatedPassword = this.passwordStrengthService.generatePassword(options.length, options);
    this.updatePassIndicator();
  }

  updatePassIndicator(): void {
    const passLength = this.lengthSlider.nativeElement.valueAsNumber;
    this.passIndicator.nativeElement.id = passLength <= 8 ? "weak" : passLength <= 16 ? "medium" : "strong";
  }

  copyPassword(): void {
    const inputElement = document.createElement('input');
    inputElement.value = this.generatedPassword;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);
  }
}
