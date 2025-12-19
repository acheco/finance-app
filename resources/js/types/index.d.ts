import { InertiaLinkProps } from '@inertiajs/react';
import { Icon } from '@phosphor-icons/react';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: NonNullable<InertiaLinkProps['href']>;
  icon: Icon | string;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  two_factor_enabled?: boolean;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}

export interface Currency {
  id: number;
  user_id: number;
  code: string;
  name: string;
  symbol: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  can: {
    update: boolean;
    delete: boolean;
  };
}

export interface Category {
  id: number;
  user_id?: number;
  transaction_type_id: number;
  transaction_type?: string;
  name: string;
  color: string;
  icon: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  can: {
    update: boolean;
    delete: boolean;
  };
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginatedData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Supplier {
  id: number;
  user_id: number | null;
  category_id?: number;
  category?: string;
  name: string;
  email?: string;
  logo?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type PaginatedCurrencies = PaginatedData<Currency>;
export type PaginatedCategories = PaginatedData<Category>;
export type PaginatedSuppliers = PaginatedData<Supplier>;
