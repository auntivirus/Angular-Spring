import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public employees?: Employee[];
  public editEmployee?: Employee | undefined;
  public deleteEmployee: Employee | undefined;
  
  constructor(private employeeService: EmployeeService) {};

  ngOnInit(): void { this.getEmployees(); }

  // Getting all the records
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  // Searching Employees
  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    
    for(const emp of this.employees!) {
      if(emp.name.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
         emp.email.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
         emp.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
         emp.jobTitle.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        results.push(emp);
      }
    }
    this.employees = results;

    if(results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  // Adding New Employee
  public onAddEmployee(addForm: NgForm):void {
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      }, 
      (error: HttpErrorResponse) => {
      alert(error.message);
    });
    addForm.reset();
  }

  // Updating selected Employee Record
  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log("Employee Records Updated!!!\n", response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
    }
    
    // Deleting selected Employee
    public onDeleteEmployee(id: number): void {
      this.employeeService.deleteEmployee(id).subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees();
        }, 
        (error: HttpErrorResponse) => {
        // alert(error.message);
        this.getEmployees();
      })
    }

  public onOpenModal(mode: string, employee: Employee | undefined): void {
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = "none";
    button.setAttribute('data-toggle','modal');
    if(mode === "add") {
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if (mode === "edit") {
      this.editEmployee = employee ;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if (mode === "delete") {
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
