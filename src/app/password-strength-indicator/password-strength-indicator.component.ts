import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-strength-indicator',
  standalone: true,
  imports: [],
  templateUrl: './password-strength-indicator.component.html',
  styleUrls: ['./password-strength-indicator.component.css']
})
export class PasswordStrengthIndicatorComponent {
  @Input() strength: 'weak' | 'medium' | 'strong' = 'weak';
}
