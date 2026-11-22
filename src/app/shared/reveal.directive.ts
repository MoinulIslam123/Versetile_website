import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/** Fades/slides an element in when it scrolls into view. Usage: <div appReveal> */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;

  ngOnInit() {
    this.el.classList.add('reveal');
    this.io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.el.classList.add('in-view');
        this.io?.disconnect();
      }
    }, { threshold: 0.12 });
    this.io.observe(this.el);
  }

  ngOnDestroy() { this.io?.disconnect(); }
}
