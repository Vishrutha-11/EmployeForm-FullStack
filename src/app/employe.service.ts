import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeService {



  apiUrl = 'https://localhost:7120/api/EmpolyeeForm/InsertEmployee';

  constructor(private http: HttpClient) {}

  addEmployee(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getEmployees() {
    return this.http.get<any[]>('https://localhost:7120/api/EmpolyeeForm/GetEmploye');
  }
}

