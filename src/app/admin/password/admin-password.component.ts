import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-password.component.html',
  styleUrl: './admin-password.component.css',
})
export class AdminPasswordComponent {
  private auth = inject(AuthService);
  current = '';
  next = '';
  confirm = '';
  message = '';
  error = '';

  save() {
    this.message = this.error = '';
    if (this.next !== this.confirm) { this.error = 'The new passwords do not match.'; return; }
    this.auth.changePassword(this.current, this.next).subscribe({
      next: () => { this.message = 'Password changed.'; this.current = this.next = this.confirm = ''; },
      error: err => (this.error = err.error?.message ?? 'Could not change the password.'),
    });
  }
}
