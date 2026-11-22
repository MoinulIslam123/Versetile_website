import { Component } from '@angular/core';
import { CORE_VALUES } from '../../data/site-data';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    PageHeaderComponent,
    SectionHeadingComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  values = CORE_VALUES;
  valueIcons = [
    'badge-check',
    'shield-check',
    'heart',
    'lightbulb',
    'handshake',
    'award',
  ];
}
