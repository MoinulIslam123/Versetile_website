import { Component } from '@angular/core';
import { SITE } from '../../data/site-data';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css',
})
export class WhatsappButtonComponent {
  link = SITE.whatsappLink;
}
