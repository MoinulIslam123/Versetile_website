import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PRODUCTS, SITE } from '../../data/site-data';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, IconComponent, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  site = SITE;
  sent = signal(false);
  interests = [...PRODUCTS.map(p => p.title), 'Interior Design & Decoration'];

  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    company: [''],
    phone: ['', Validators.required],
    email: ['', Validators.email],
    interest: [''],
    quantity: [''],
    message: ['', Validators.required],
  });

  clean(n: string) { return n.replace(/\s/g, ''); }
  invalid(c: string) { const x = this.form.get(c)!; return x.invalid && x.touched; }

  // No backend yet: opens WhatsApp with the inquiry pre-filled. Replace with an API call when ready.
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const text = [
      'New Inquiry – Versatile Support & Supply',
      `Name: ${v.fullName}`, `Company: ${v.company || '-'}`, `Phone: ${v.phone}`, `Email: ${v.email || '-'}`,
      `Interested in: ${v.interest || '-'}`, `Quantity: ${v.quantity || '-'}`, `Message: ${v.message}`,
    ].join('\n');
    window.open(`${SITE.whatsappLink}?text=${encodeURIComponent(text)}`, '_blank');
    this.sent.set(true);
    this.form.reset();
  }
}
