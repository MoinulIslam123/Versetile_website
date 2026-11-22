import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQS, SITE } from '../../data/site-data';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  faqs = FAQS;
  site = SITE;
  open = signal<number | null>(0);
  toggle(i: number) { this.open.update(v => (v === i ? null : i)); }
}
