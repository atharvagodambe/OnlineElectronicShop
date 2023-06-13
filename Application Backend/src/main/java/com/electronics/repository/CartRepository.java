package com.electronics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.electronics.model.Cart;
import com.electronics.model.Customer;



@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	
	void deleteCartByCustomer(Customer c);
}