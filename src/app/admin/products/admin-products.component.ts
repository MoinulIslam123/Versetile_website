import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, Product, ProductCategory } from '../../core/api.service';
import { IconComponent } from '../../shared/icon.component';
import { ICONS } from '../../shared/icons';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent implements OnInit {
  private api = inject(ApiService);
  iconNames = Object.keys(ICONS);

  categories: ProductCategory[] = [];
  products: Product[] = [];
  selected: ProductCategory | null = null;

  catForm: ProductCategory | null = null;
  prodForm: Product | null = null;
  error = '';

  ngOnInit() { this.loadCategories(); }

  /* ---- categories ---- */
  loadCategories(selectId?: number) {
    this.api.list<ProductCategory>('product-categories').subscribe({
      next: list => {
        this.categories = list;
        const id = selectId ?? this.selected?.id;
        this.selected = list.find(c => c.id === id) ?? list[0] ?? null;
        this.loadProducts();
      },
      error: () => (this.error = 'Could not load data. Is the API running?'),
    });
  }

  select(c: ProductCategory) { this.selected = c; this.prodForm = null; this.loadProducts(); }

  newCategory() { this.catForm = { id: 0, name: '', letter: String.fromCharCode(65 + this.categories.length), icon: 'package', sortOrder: this.categories.length + 1 }; }
  editCategory(c: ProductCategory) { this.catForm = { ...c }; }

  saveCategory() {
    const f = this.catForm!;
    const req = f.id ? this.api.update<ProductCategory>('product-categories', f.id, f) : this.api.create<ProductCategory>('product-categories', f);
    req.subscribe({ next: saved => { this.catForm = null; this.loadCategories(saved.id); }, error: () => (this.error = 'Could not save the category.') });
  }

  deleteCategory(c: ProductCategory) {
    if (!confirm(`Delete "${c.name}" and ALL its products?`)) return;
    this.api.remove('product-categories', c.id).subscribe(() => { this.selected = null; this.loadCategories(); });
  }

  /* ---- products ---- */
  loadProducts() {
    if (!this.selected) { this.products = []; return; }
    this.api.list<Product>('products', { categoryId: this.selected.id }).subscribe(list => (this.products = list));
  }

  newProduct() { this.prodForm = { id: 0, categoryId: this.selected!.id, name: '', sortOrder: this.products.length + 1, isActive: true }; }
  editProduct(p: Product) { this.prodForm = { ...p }; }

  saveProduct() {
    const f = this.prodForm!;
    const req = f.id ? this.api.update<Product>('products', f.id, f) : this.api.create<Product>('products', f);
    req.subscribe({ next: () => { this.prodForm = null; this.loadProducts(); }, error: () => (this.error = 'Could not save the product.') });
  }

  toggleActive(p: Product) {
    this.api.update<Product>('products', p.id, { ...p, isActive: !p.isActive }).subscribe(() => this.loadProducts());
  }

  deleteProduct(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    this.api.remove('products', p.id).subscribe(() => this.loadProducts());
  }
}
