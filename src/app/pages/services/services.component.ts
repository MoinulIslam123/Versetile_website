import { Component } from '@angular/core';
import { SERVICES } from '../../data/site-data';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { WorkProcessComponent } from '../../components/work-process/work-process.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [PageHeaderComponent, WorkProcessComponent, IconComponent, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services = SERVICES;
}
