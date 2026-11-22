import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../../data/site-data';
import { ApiService, PublicCategory } from '../../core/api.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  // starts with the built-in content, then switches to the database content once the API answers
  products = signal<PublicCategory[]>(PRODUCTS);
  active = signal<string | number>(PRODUCTS[0].id);
  current = computed(() => this.products().find(p => p.id === this.active()) ?? this.products()[0]);

  constructor() {
    inject(ApiService).products().subscribe({
      next: list => {
        if (list.length) {
          this.products.set(list);
          this.active.set(list[0].id);
        }
      },
      error: () => { /* API offline: keep the built-in content */ },
    });
  }
}
