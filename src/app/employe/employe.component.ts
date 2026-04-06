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


  constructor(private employeService: EmployeService) {}

  ngOnInit() {
  this.loadEmployees();
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
//  onSubmit(form: NgForm) {
//   if (form.valid) {

//     console.log("Form Data:", form.value);

//     this.employeService.addEmployee(form.value).subscribe({
//       next: (res: any) => {
//         console.log("Employee added:", res);
//         alert("Employee added successfully!");

//         form.reset();

//         this.loadEmployees();  // ✅ CORRECT PLACE
      
//   //      console.log(this.employee);  // gender should be 0 or 1

//   // this.employeService.addEmployee(this.employee).subscribe(res => {
//   //   console.log('Saved successfully');
//   //});
      
      
//       },
//       error: (err: any) => {
//         console.error("Error:", err);
//       }
//     });

//   } else {
//     console.log("Form is invalid");
//   }
//   form.reset();
//   this.loadEmployees();
// }

onSubmit(form: NgForm) {
  if (form.valid) {

    console.log("Form Data:", form.value);

    this.employeService.addEmployee(form.value).subscribe({
      next: (res: any) => {
        console.log("Employee added:", res);
        alert("Employee added successfully!");

        form.reset();           // ✅ only here
        this.loadEmployees();   // ✅ only here
      },
      error: (err: any) => {
        console.error("Error:", err);
      }
    });

  } else {
    console.log("Form is invalid");
  }
}
}
