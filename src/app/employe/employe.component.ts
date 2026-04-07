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


successMessage = '';
errorMessage = '';
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

onSubmit(form: NgForm) {
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


// import { Component, OnInit } from '@angular/core';
// import { EmployeService } from '../employe.service';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-employe-form',
//   templateUrl: './employe-form.component.html',
//   styleUrls: ['./employe-form.component.css']
// })
// export class EmployeFormComponent implements OnInit{

//   employees: any[] = [];
// successMessage: string = '';

//   constructor(private employeService: EmployeService) {}

//   ngOnInit() {
//   this.loadEmployees();
// }


// loadEmployees() {
//   this.employeService.getEmployees().subscribe((res: any[]) => {
//     this.employees = res;
//     console.log("Employees:", res);
//   });
// }

//  onSubmit(form: NgForm) {
//   if (form.valid) {

//     console.log("Form Data:", form.value);

//     this.employeService.addEmployee(form.value).subscribe({
//       next: (res: any) => {
//         console.log("Employee added:");
//           alert("Employee added successfully! ✅");

//         form.resetForm();

//         this.loadEmployees();
        
//         // // Optional: auto-hide message after 3 sec
//         // setTimeout(() => {
//         //   this.successMessage = '';
//         // }, 3000);  
//       },
//      error: (err: any) => {
//       alert("API FAILED ❌");
//   console.error("Full Error:", err);
//   console.error("Status:", err.status);
//   console.error("Message:", err.message);
//   console.error("Error Body:", err.error);
// }
//     });

//   } else {
//     console.log("Form is invalid");
//   }
// }
// }