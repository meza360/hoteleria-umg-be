import { Customer } from '../models';
import dataStore from './dataStore';

export class CustomerService {
  createCustomer(customer: Omit<Customer, 'id'>): Customer {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      throw new Error('Email inválido');
    }

    // Verificar si el email ya existe
    const existingCustomer = dataStore.customers.find(c => c.email === customer.email);
    if (existingCustomer) {
      throw new Error('El email ya está registrado');
    }

    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...customer
    };
    dataStore.customers.push(newCustomer);
    return newCustomer;
  }

  getAllCustomers(): Customer[] {
    return dataStore.customers;
  }

  getCustomerById(id: string): Customer | undefined {
    return dataStore.customers.find(customer => customer.id === id);
  }

  updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
    const customer = this.getCustomerById(id);
    if (customer) {
      Object.assign(customer, updates);
      return customer;
    }
    return null;
  }

  deleteCustomer(id: string): boolean {
    const index = dataStore.customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
      dataStore.customers.splice(index, 1);
      return true;
    }
    return false;
  }
}