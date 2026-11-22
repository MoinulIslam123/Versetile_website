import { Component } from '@angular/core';
import { PROCESS } from '../../data/site-data';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-work-process',
  standalone: true,
  imports: [
    SectionHeadingComponent,
    RevealDirective,
    PageHeaderComponent,
    IconComponent,
    RouterLink,
  ],
  templateUrl: './work-process.component.html',
  styleUrl: './work-process.component.css',
})
export class WorkProcessComponent {
  steps = PROCESS;
}
