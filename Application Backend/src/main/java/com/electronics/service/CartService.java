package com.electronics.service;

import java.util.List;


import com.electronics.model.Cart;
import com.electronics.model.Customer;
import com.electronics.model.Product;



public interface CartService {

	Cart addCart(Cart cart,long productId,long customerId);
	List<Cart> getAllCarts();
	Cart getCartById(long cartId);
	Cart updateCart(Cart cart, long cartId);
	void deleteCart(long cartId);
	void deleteCartByCustomer(Customer c);
	
	

}