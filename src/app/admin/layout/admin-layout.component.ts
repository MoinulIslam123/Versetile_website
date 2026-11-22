import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
  links = [
    { path: '/admin/products', label: 'Products', icon: 'boxes' },
    { path: '/admin/interiors', label: 'Interiors', icon: 'sofa' },
    { path: '/admin/paper-tube', label: 'Paper Tube', icon: 'scroll' },
    { path: '/admin/password', label: 'Change Password', icon: 'shield-check' },
  ];
}
