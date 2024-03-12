import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  private characters: { [key: string]: string } = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~♥️❥웃유♋️☮️✌️☏☢️☠️✔️☑️♚▲♪฿Ɖ⛏"
  };

  generatePassword(length: number, options: any): string {
    let staticPassword = '';
    let randomPassword = '';
    const { lowercase, uppercase, numbers, symbols, excludeDuplicate, includeSpaces } = options;

    if (lowercase) staticPassword += this.characters['lowercase'];
    if (uppercase) staticPassword += this.characters['uppercase'];
    if (numbers) staticPassword += this.characters['numbers'];
    if (symbols) staticPassword += this.characters['symbols'];    
    if (includeSpaces) staticPassword += ' ';

    for (let i = 0; i < length; i++) {
      const randomChar = staticPassword.charAt(Math.floor(Math.random() * staticPassword.length));
      if (excludeDuplicate) {
        if (!randomPassword.includes(randomChar) || randomChar === ' ') {
          randomPassword += randomChar;
        } else {
          i--;
        }
      } else {
        randomPassword += randomChar;
      }
    }
    return randomPassword;
  }
}
