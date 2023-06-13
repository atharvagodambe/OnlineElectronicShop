package com.electronics.service;

import java.util.List;

import com.electronics.model.Admin;
import com.electronics.model.Customer;
import com.electronics.model.Product;

public interface AdminService {
	Admin saveAdmin(Admin admin);
	Admin loginAdmin(Admin admin);
	
	public List<Product> getAllProducts(long adminId);
	public List<Customer> getAllCustomers(long adminId);
}