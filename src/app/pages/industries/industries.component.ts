import { Component } from '@angular/core';
import { INDUSTRIES } from '../../data/site-data';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.css',
})
export class IndustriesComponent {
  industries = INDUSTRIES;
}
