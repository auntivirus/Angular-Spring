package com.angularspring.service;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.angularspring.exception.EmployeeException;
import com.angularspring.model.Employee;
import com.angularspring.repository.EmployeeRepository;

@Service
public class EmployeeService {
	private final EmployeeRepository employeeRepository;
	
	@Autowired
	public EmployeeService(EmployeeRepository employeeRepo) {
		this.employeeRepository = employeeRepo;
	}
	
	public Employee addEmployee(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepository.save(employee);
	}
	
	public List<Employee> findAllEmployees() {
		return employeeRepository.findAll();
	}
	
	public Employee updateEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
	
	public Employee findEmployeeById(Long id) {
//		return employeeRepository.findById(id).orElse(null);
		return employeeRepository.findById(id).orElseThrow(() -> new EmployeeException("User by id "+id+" was not found"));
	}
	
	public void deleteEmployee(Long id) {
		employeeRepository.deleteById(id);
	}
}
