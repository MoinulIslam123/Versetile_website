import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    title: 'About Us | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'products',
    title: 'Products | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent,
      ),
  },
  {
    path: 'services',
    title: 'Services | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/services/services.component').then(
        (m) => m.ServicesComponent,
      ),
  },
  {
    path: 'interiors',
    title: 'Interiors & Paper Tube | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/interiors-paper-tube/interiors-paper-tube.component').then(
        (m) => m.InteriorsPaperTubeComponent,
      ),
  },
  {
    path: 'industries',
    title: 'Industries | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/industries/industries.component').then(
        (m) => m.IndustriesComponent,
      ),
  },
  {
    path: 'work-process',
    title: 'Work Process | Versatile Support & Supply',
    loadComponent: () =>
      import('./components/work-process/work-process.component').then(
        (m) => m.WorkProcessComponent,
      ),
  },
  {
    path: 'gallery',
    title: 'Gallery | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/gallery/gallery.component').then(
        (m) => m.GalleryComponent,
      ),
  },
  {
    path: 'why-choose-us',
    title: 'Why Choose Us | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/why-choose-us/why-choose-us.component').then(
        (m) => m.WhyChooseUsComponent,
      ),
  },
  {
    path: 'faq',
    title: 'FAQ | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/faq/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: 'contact',
    title: 'Contact Us | Versatile Support & Supply',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  // ---------- Admin panel ----------
  {
    path: 'admin/login',
    title: 'Admin Login',
    loadComponent: () =>
      import('./admin/login/admin-login.component').then(
        (m) => m.AdminLoginComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin/layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        title: 'Admin | Products',
        loadComponent: () =>
          import('./admin/products/admin-products.component').then(
            (m) => m.AdminProductsComponent,
          ),
      },
      {
        path: 'interiors',
        title: 'Admin | Interiors',
        data: {
          title: 'Interiors',
          endpoint: 'interior-services',
          contentKey: 'InteriorsIntro',
          hasKind: false,
        },
        loadComponent: () =>
          import('./admin/items/admin-items.component').then(
            (m) => m.AdminItemsComponent,
          ),
      },
      {
        path: 'paper-tube',
        title: 'Admin | Paper Tube',
        data: {
          title: 'Paper Tube Solutions',
          endpoint: 'paper-tube',
          contentKey: 'PaperTubeIntro',
          hasKind: true,
        },
        loadComponent: () =>
          import('./admin/items/admin-items.component').then(
            (m) => m.AdminItemsComponent,
          ),
      },
      {
        path: 'password',
        title: 'Admin | Password',
        loadComponent: () =>
          import('./admin/password/admin-password.component').then(
            (m) => m.AdminPasswordComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
