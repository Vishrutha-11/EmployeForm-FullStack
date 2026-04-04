import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeComponent } from './employe.component';

describe('EmployeComponent', () => {
  let component: EmployeComponent;
  let fixture: ComponentFixture<EmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeComponent]
    });
    fixture = TestBed.createComponent(EmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// <div class="container">
//   <div class="form-container">
//     <h1>Employee Form</h1>

//     <form #empForm="ngForm" (ngSubmit)="onSubmit(empForm)">

//       <!-- NAME -->
//       <label>Name</label>
//       <input type="text" name="name" ngModel placeholder="Enter Name">

//       <!-- PHONE -->
//       <label>Phone Number</label>
//       <input type="tel" name="phoneNumber" ngModel placeholder="Enter Phone Number">

//       <!-- DEPARTMENT -->
//       <label>Department</label>
//       <input type="text" name="empDept" ngModel placeholder="Enter Department">

//       <!-- ADDRESS -->
//       <label>Address</label>
//       <textarea name="address" ngModel placeholder="Enter Address"></textarea>

//       <!-- GENDER -->
//       <label>Gender</label>
//       <div class="gender">
//         <label>
//           <input type="radio" name="gender" value="Male" ngModel> Male
//         </label>
//         <label>
//           <input type="radio" name="gender" value="Female" ngModel> Female
//         </label>
//       </div>

//       <!-- FILE -->
//       <label>Upload File</label>
//       <input type="file" name="files" (change)="onFileSelect($event)">

//       <!-- BUTTON -->
//       <button type="submit">Submit</button>

//     </form>
//   </div>
// </div>