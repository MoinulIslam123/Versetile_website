import { Component, input } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.css',
})
export class SectionHeadingComponent {
  eyebrow = input('');
  title = input.required<string>();
  subtitle = input('');
  light = input(false);
}
