import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {
  @ViewChild('lengthSlider', { static: false }) lengthSlider!: ElementRef<HTMLInputElement> | null;
  @ViewChild('options', { static: false }) options!: ElementRef<HTMLInputElement>[] | null;
  @ViewChild('copyIcon', { static: false }) copyIcon!: ElementRef<HTMLElement> | null;
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef<HTMLInputElement> | null;
  @ViewChild('passIndicator', { static: false }) passIndicator!: ElementRef<HTMLDivElement> | null;
  @ViewChild('generateBtn', { static: false }) generateBtn!: ElementRef<HTMLButtonElement> | null;

  characters: { [key: string]: string } = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~♥️❥웃유♋️☮️✌️☏☢️☠️✔️☑️♚▲♪฿Ɖ⛏"
  };

  generatePassword(): void {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = false;
    const passLength = this.lengthSlider ? parseInt(this.lengthSlider.nativeElement.value) : 0;

    if (this.options) {
      this.options.forEach((option: ElementRef<HTMLInputElement>) => {
        if (option.nativeElement.checked) {
          if (option.nativeElement.id !== "exc-duplicate" && option.nativeElement.id !== "spaces") {
            staticPassword += this.characters[option.nativeElement.id];
          } else if (option.nativeElement.id === "spaces") {
            staticPassword += `  ${staticPassword}  `;
          } else {
            excludeDuplicate = true;
          }
        }
      });
    }

    for (let i = 0; i < passLength; i++) {
      const randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
      if (excludeDuplicate) {
        if (!randomPassword.includes(randomChar) || randomChar === " ") {
          randomPassword += randomChar;
        } else {
          i--;
        }
      } else {
        randomPassword += randomChar;
      }
    }
    if (this.passwordInput) {
      this.passwordInput.nativeElement.value = randomPassword;
    }
  }

  updatePassIndicator(): void {
    if (this.passIndicator && this.lengthSlider) {
      this.passIndicator.nativeElement.id = this.lengthSlider.nativeElement.valueAsNumber <= 8 ? "weak" : this.lengthSlider.nativeElement.valueAsNumber <= 16 ? "medium" : "strong";
    }
  }

  updateSlider(): void {
    const sliderValueSpan: HTMLElement | null = document.querySelector(".pass-length span");
    if (sliderValueSpan && this.lengthSlider) {
      sliderValueSpan.innerText = this.lengthSlider.nativeElement.value;
      this.generatePassword();
      this.updatePassIndicator();
    }
  }

  copyPassword(): void {
    if (this.passwordInput) {
      navigator.clipboard.writeText(this.passwordInput.nativeElement.value).then(() => {
        if (this.copyIcon) {
          this.copyIcon.nativeElement.innerText = "check";
          this.copyIcon.nativeElement.style.color = "#4285f4";
          setTimeout(() => {
            if (this.copyIcon) {
              this.copyIcon.nativeElement.innerText = "copy_all";
              this.copyIcon.nativeElement.style.color = "#707070";
            }
          }, 1500);
        }
      });
    }
  }

  ngOnInit(): void {
    this.updateSlider();
    if (this.copyIcon) {
      this.copyIcon.nativeElement.addEventListener("click", this.copyPassword.bind(this));
    }
    if (this.lengthSlider) {
      this.lengthSlider.nativeElement.addEventListener("input", this.updateSlider.bind(this));
    }
    if (this.generateBtn) {
      this.generateBtn.nativeElement.addEventListener("click", this.generatePassword.bind(this));
    }
  }
}
