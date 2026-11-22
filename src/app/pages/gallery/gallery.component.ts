import { Component } from '@angular/core';
import { GALLERY } from '../../data/site-data';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  items = GALLERY;
}
