
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent {
onSubmit(form:any){
  console.log(form.value);
  console.log(this.selectedFile);
}

selectedFile: File | null = null;

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
