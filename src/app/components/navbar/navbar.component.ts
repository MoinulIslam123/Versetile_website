import { Component, HostListener, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV, SITE } from '../../data/site-data';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  nav = NAV;
  // "Contact Us" is the gold button on desktop, so it is left out of the link row
  navDesktop = NAV.filter(l => l.path !== '/contact');
  site = SITE;

  open = signal(false);
  scrolled = signal(false);
  progress = signal(0);

  constructor() {
    // lock page scroll while the mobile drawer is open
    effect(() => {
      document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrolled.set(y > 30);
    this.progress.set(max > 0 ? (y / max) * 100 : 0);
  }

  @HostListener('document:keydown.escape')
  onEscape() { this.close(); }

  toggle() { this.open.update(v => !v); }
  close() { this.open.set(false); }
}
