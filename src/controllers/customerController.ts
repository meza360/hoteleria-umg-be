import { Request, Response } from 'express';
import { CustomerService } from '../services';

const customerService = new CustomerService();

export const createCustomer = (req: Request, res: Response) => {
  try {
    const customer = customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllCustomers = (req: Request, res: Response) => {
  const customers = customerService.getAllCustomers();
  res.json(customers);
};

export const getCustomerById = (req: Request, res: Response) => {
  const customer = customerService.getCustomerById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
};

export const updateCustomer = (req: Request, res: Response) => {
  const customer = customerService.updateCustomer(req.params.id, req.body);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
};

export const deleteCustomer = (req: Request, res: Response) => {
  const success = customerService.deleteCustomer(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
};