import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { BUSINESS_CATEGORIES } from '../../data/site-data';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroComponent, SectionHeadingComponent, IconComponent, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  marquee = [...BUSINESS_CATEGORIES, ...BUSINESS_CATEGORIES];
  offers = [
    { icon: 'printer', title: 'Professional Printing Solutions' },
    { icon: 'package', title: 'Customized Packaging Solutions' },
    { icon: 'gift', title: 'Corporate Gift Items' },
    { icon: 'megaphone', title: 'Promotional Merchandise' },
    { icon: 'briefcase', title: 'Business & Office Accessories' },
    { icon: 'sofa', title: 'Interior Design & Decoration' },
    { icon: 'scroll', title: 'Paper Tube Products' },
    { icon: 'sparkles', title: 'Customized Products' },
  ];
  reasons = [
    'Quality-Focused Products and Services',
    'Competitive Pricing',
    'Wholesale & Retail Solutions',
    'Customized Orders',
    'Professional Customer Support',
    'Commitment to Customer Satisfaction',
  ];
}
