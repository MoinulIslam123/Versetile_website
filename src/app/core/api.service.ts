import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from './api.config';

/* ---------- public shapes (what the website pages show) ---------- */
export interface PublicCategory { id: string | number; letter: string; icon: string; title: string; items: string[]; }
export interface PublicCard { icon: string; title: string; text: string; }
export interface PublicInteriors { intro: string; services: PublicCard[]; }
export interface PublicPaperTube { intro: string; services: PublicCard[]; products: string[]; }

/* ---------- admin shapes (database rows) ---------- */
export interface ProductCategory { id: number; name: string; letter: string; icon: string; sortOrder: number; }
export interface Product { id: number; categoryId: number; name: string; sortOrder: number; isActive: boolean; }
export interface ContentItem { id: number; title: string; description: string | null; icon: string; sortOrder: number; isActive: boolean; kind?: string; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  /* public */
  products() { return this.http.get<PublicCategory[]>(`${API_URL}/public/products`); }
  interiors() { return this.http.get<PublicInteriors>(`${API_URL}/public/interiors`); }
  paperTube() { return this.http.get<PublicPaperTube>(`${API_URL}/public/paper-tube`); }

  /* admin (needs login) */
  list<T>(path: string, params?: Record<string, string | number>) { return this.http.get<T[]>(`${API_URL}/admin/${path}`, { params }); }
  create<T>(path: string, body: Partial<T>) { return this.http.post<T>(`${API_URL}/admin/${path}`, body); }
  update<T>(path: string, id: number, body: Partial<T>) { return this.http.put<T>(`${API_URL}/admin/${path}/${id}`, body); }
  remove(path: string, id: number) { return this.http.delete<void>(`${API_URL}/admin/${path}/${id}`); }

  getContent() { return this.http.get<Record<string, string>>(`${API_URL}/admin/content`); }
  setContent(key: string, value: string) { return this.http.put<void>(`${API_URL}/admin/content/${key}`, { value }); }
}
