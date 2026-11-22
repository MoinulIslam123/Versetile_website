import { Component } from '@angular/core';
import { PROCESS } from '../../data/site-data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';

@Component({
  selector: 'app-work-process',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './work-process.component.html',
  styleUrl: './work-process.component.css',
})
export class WorkProcessComponent {
  steps = PROCESS;
}
