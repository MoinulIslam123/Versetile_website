import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  INTERIOR_SERVICES,
  SERVICES,
  TUBE_SERVICES,
} from '../../data/site-data';
import { ApiService, PublicCard } from '../../core/api.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { WorkProcessComponent } from '../../components/work-process/work-process.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    RouterLink,
    PageHeaderComponent,
    WorkProcessComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services = SERVICES;

  // B and C start with the built-in text, then use the database content (editable in the admin panel)
  interiors = signal<PublicCard[]>(INTERIOR_SERVICES);
  tube = signal<PublicCard[]>(TUBE_SERVICES);

  constructor() {
    const api = inject(ApiService);
    api.interiors().subscribe({
      next: (r) => {
        if (r.services.length) this.interiors.set(r.services);
      },
      error: () => {},
    });
    api.paperTube().subscribe({
      next: (r) => {
        if (r.services.length) this.tube.set(r.services);
      },
      error: () => {},
    });
  }
}
