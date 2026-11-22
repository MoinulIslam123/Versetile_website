import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ContentItem } from '../../core/api.service';
import { IconComponent } from '../../shared/icon.component';
import { ICONS } from '../../shared/icons';

/** One screen used for both "Interiors" and "Paper Tube Solutions" (settings come from the route data). */
@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './admin-items.component.html',
  styleUrl: './admin-items.component.css',
})
export class AdminItemsComponent implements OnInit {
  private api = inject(ApiService);
  private cfg = inject(ActivatedRoute).snapshot.data as { title: string; endpoint: string; contentKey: string; hasKind: boolean };

  title = this.cfg.title;
  hasKind = this.cfg.hasKind;
  iconNames = Object.keys(ICONS);

  items: ContentItem[] = [];
  form: ContentItem | null = null;
  intro = '';
  introMsg = '';
  error = '';

  ngOnInit() {
    this.load();
    this.api.getContent().subscribe(c => (this.intro = c[this.cfg.contentKey] ?? ''));
  }

  load() {
    this.api.list<ContentItem>(this.cfg.endpoint).subscribe({
      next: list => (this.items = list),
      error: () => (this.error = 'Could not load data. Is the API running?'),
    });
  }

  saveIntro() {
    this.api.setContent(this.cfg.contentKey, this.intro).subscribe({
      next: () => { this.introMsg = 'Saved ✔'; setTimeout(() => (this.introMsg = ''), 2500); },
      error: () => (this.introMsg = 'Could not save.'),
    });
  }

  add(kind = 'Service') {
    this.form = { id: 0, title: '', description: '', icon: this.hasKind ? 'scroll' : 'sparkles', sortOrder: this.items.length + 1, isActive: true, kind };
  }
  edit(i: ContentItem) { this.form = { ...i }; }

  save() {
    const f = this.form!;
    const req = f.id ? this.api.update<ContentItem>(this.cfg.endpoint, f.id, f) : this.api.create<ContentItem>(this.cfg.endpoint, f);
    req.subscribe({ next: () => { this.form = null; this.load(); }, error: () => (this.error = 'Could not save.') });
  }

  toggle(i: ContentItem) { this.api.update<ContentItem>(this.cfg.endpoint, i.id, { ...i, isActive: !i.isActive }).subscribe(() => this.load()); }

  remove(i: ContentItem) {
    if (!confirm(`Delete "${i.title}"?`)) return;
    this.api.remove(this.cfg.endpoint, i.id).subscribe(() => this.load());
  }
}
