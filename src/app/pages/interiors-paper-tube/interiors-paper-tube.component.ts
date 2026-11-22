import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INTERIOR_SERVICES, PRODUCTS, TUBE_SERVICES } from '../../data/site-data';
import { ApiService, PublicCard } from '../../core/api.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-interiors-paper-tube',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './interiors-paper-tube.component.html',
  styleUrl: './interiors-paper-tube.component.css',
})
export class InteriorsPaperTubeComponent {
  // built-in content first; replaced by the database content when the API answers
  interiorsIntro = signal('We provide creative, functional, and modern interior design and decoration solutions for residential, commercial, exhibition, and corporate spaces — transforming ordinary spaces into beautiful, comfortable, and productive environments that reflect our clients’ vision and lifestyle.');
  interiors = signal<PublicCard[]>(INTERIOR_SERVICES);

  tubeIntro = signal('We offer paper tube products and customized paper tube packaging for different business and product requirements. Discuss your preferred sizes, specifications, printing, and finishing with our team.');
  tube = signal<PublicCard[]>(TUBE_SERVICES);
  tubeProducts = signal<string[]>([...PRODUCTS.find(p => p.id === 'tube')!.items.slice(0, 4), 'Paper Cores & Industrial Tubes (subject to availability)', 'Customized Paper Tube Packaging']);

  constructor() {
    const api = inject(ApiService);

    api.interiors().subscribe({
      next: r => {
        if (r.intro) this.interiorsIntro.set(r.intro);
        this.interiors.set(r.services);
      },
      error: () => { /* API offline: keep the built-in content */ },
    });

    api.paperTube().subscribe({
      next: r => {
        if (r.intro) this.tubeIntro.set(r.intro);
        this.tube.set(r.services);
        this.tubeProducts.set(r.products);
      },
      error: () => { /* API offline: keep the built-in content */ },
    });
  }
}
