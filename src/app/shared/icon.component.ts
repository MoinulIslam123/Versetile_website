import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from './icons';

/** Usage: <app-icon name="printer" class="h-6 w-6" />  (size/color come from the classes you put on it) */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: '',
  host: { class: 'inline-flex shrink-0', '[innerHTML]': 'html' },
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);
  html: SafeHtml = '';

  @Input() set name(value: string) {
    const inner = ICONS[value] ?? '';
    this.html = this.sanitizer.bypassSecurityTrustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%">${inner}</svg>`
    );
  }
}
