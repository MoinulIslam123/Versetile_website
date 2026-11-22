import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS_CATEGORIES } from '../../data/site-data';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  categories = BUSINESS_CATEGORIES;
  trust = ['Wholesale & Retail', 'Customized Orders', 'Quality-Focused'];
}
