import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV, SITE } from '../../data/site-data';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  nav = NAV;
  site = SITE;
  year = new Date().getFullYear();
  categories = ['Printing Solutions', 'Packaging Solutions', 'Corporate & Promotional Gifts', 'Business & Office Accessories', 'Interior Design & Decoration', 'Paper Tube Solutions'];

  toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
