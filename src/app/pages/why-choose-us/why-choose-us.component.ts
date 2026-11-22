import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHY_US } from '../../data/site-data';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.css',
})
export class WhyChooseUsComponent {
  reasons = WHY_US;
}
