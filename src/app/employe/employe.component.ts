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
  constructor(private employeService: EmployeService) {}


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
  const file = event.target.files[0];
  this.selectedFile = file;
}

// onSubmit(form: NgForm) {
//   if (form.valid) {

//     console.log("Form Data:", form.value);

//     this.employeService.addEmployee(form.value).subscribe({
//       next: (res: any) => {
//         console.log("Employee added:", res);
//         alert("Employee added successfully!");

//         form.reset();           // ✅ only here
//         this.loadEmployees();   // ✅ only here
//       },
//       error: (err: any) => {
//         console.error("Error:", err);
//       }
//     });

//   } else {
//     console.log("Form is invalid");
//   }
// }


onSubmit(form: NgForm) {
  if (form.valid) {

    const data = {
      ...form.value,
      files: this.selectedFile ? this.selectedFile.name : ''
    };

    this.employeService.addEmployee(data).subscribe({
      next: (res: any) => {
        alert("Employee added successfully!");
        form.reset();
        this.loadEmployees();
      },
      error: (err: any) => {
        console.error("Error:", err);
      }
    });

  }
}
}
