// employe.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../employe.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  employees: any[] = [];
  departments: any[] = [];
  selectedDeptId: number | null = null;
  submitted: boolean = false;


  constructor(private employeService: EmployeService) { }


  employee: any = {
    name: '',
    phoneNumber: '',
    address: '',
    gender: '',
    files: '',
    deptId: ''
  };
  ngOnInit() {
    this.loadEmployees();
    this.getDepartments();
  }
  getDepartments() {
    this.employeService.getDepartments().subscribe((res: any) => {
      console.log("Departments API Response:", res);
      this.departments = res; // ✅ FIXED
    });
  }
  loadEmployees() {
    this.employeService.getEmployees().subscribe((res: any[]) => {
      this.employees = res;
      console.log("Employees:", res);
    });
  }

  selectedFile: File | null = null;

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    this.submitted = true
    if (form.invalid || !this.selectedFile) {
      form.control.markAllAsTouched();
      return;
    }

    if (form.valid) {
      const data = {
        ...form.value,
        files: this.selectedFile ? this.selectedFile.name : ''
      };

      this.employeService.addEmployee(data).subscribe({
        next: (res: any) => {
          console.log("SUCCESS RESPONSE 👉", res);

          // ✅ ONLY ONE ALERT
          alert("Employee added successfully! ✅");

          form.resetForm();
          this.loadEmployees();
          this.selectedFile = null;


          this.submitted = false;
        },
        error: (err: any) => {

          console.log("ERROR 👉", err.error);

          let errorMsg = '';

          // ✅ handle both string and object
          if (typeof err.error === 'string') {
            errorMsg = err.error;
          } else if (err.error && err.error.message) {
            errorMsg = err.error.message;
          }

          // ✅ correct alert
          if (errorMsg.includes("Phone number already exists")) {
            alert("Phone number already exists ❌");
          } else {
            alert("Something went wrong ❌");
          }
        }
      });

    }
  }
}
