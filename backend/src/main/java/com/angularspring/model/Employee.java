package com.angularspring.model;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity @Data
public class Employee implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false, updatable = false)
	private Long id;
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String jobTitle;
	@Column
	private String phoneNumber;
	@Column
	private String imageUrl;
	@Column
	private String employeeCode;
	
	// NO NEED TO PASS id AND employeeCode in JSON
}