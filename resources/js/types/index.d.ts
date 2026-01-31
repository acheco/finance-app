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

export interface CategoryOption {
  id: string;
  name: string;
  icon: string | null;
  suppliers_count: number;
}

export interface AccountType {
  value: string;
  label: string;
  icon: string;
  color: string;
}

export interface CreateTransactionFormProps {
  transactionTypes: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
    transaction_type_id: number;
  }[];
  accounts: {
    id: number;
    name: string;
    balance: number;
  }[];
  suppliers: {
    id: number;
    name: string;
    category_id: number;
  }[];
}

export interface TransactionFormProps {
  mode: 'edit' | 'create';
  defaultValues?: Transaction;
  transactionTypes: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
    transaction_type_id: number;
  }[];
  accounts: {
    id: number;
    name: string;
    balance: number;
  }[];
  suppliers: {
    id: number;
    name: string;
    category_id: number;
  }[];
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
  category_id: number;
  category?: string;
  name: string;
  email?: string;
  logo?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  can: {
    update: boolean;
    delete: boolean;
  };
}

export interface Account {
  id: number;
  user_id: number;
  currency_id: number;
  currency?: string;
  name: string;
  account_type: string;
  balance: number;
  initial_balance: number;
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

export interface Transaction {
  id: number;
  user_id: number;
  account_id: number;
  transaction_type_id: number;
  transaction_type: string;
  category_id: number;
  category: string;
  supplier_id: number;
  supplier: string;
  amount: number;
  description: string;
  transaction_date: Date | string;
  notes: string;
  icon: string;
  color: string;
  created_at?: string;
  updated_at?: string;
  can: {
    update: boolean;
    delete: boolean;
  };
}

export interface Budget {
  id: number;
  user_id: number;
  category_id: number;
  currency_id: string;
  budget_amount: number;
  formatedBudgetAmount: number;
  remaining_amount: number;
  spent_amount: number;
  formatedSpentAmount: number;
  period_type: 'monthly' | 'yearly' | 'custom';
  start_date: Date | string;
  end_date: Date | string;
  currency: {
    id: string;
    name: string;
    code: string;
    symbol: string;
  };
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  recent_transactions: {
    id: number;
    amount: number;
    transaction_date: string;
    supplier_id: number;
    category_id: number;
    supplier: {
      id: number;
      name: string;
      logo: string;
    };
  }[];
}

export interface BudgetFormProps {
  mode: 'edit' | 'create';
  defaultValues: Budget;
  categories: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  currencies: {
    id: string;
    name: string;
    code: string;
    symbol: string;
  };
  budgetPeriod: {
    value: string;
    label: string;
  };
}

export type PaginatedCurrencies = PaginatedData<Currency>;
export type PaginatedCategories = PaginatedData<Category>;
export type PaginatedSuppliers = PaginatedData<Supplier>;
export type PaginatedAccounts = PaginatedData<Account>;
export type PaginatedTransactions = PaginatedData<Transaction>;
