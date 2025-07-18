import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../../models/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  createTeacher(teacher: Teacher): Observable<any> {
    return this.http.post<any>(this.apiUrl, teacher);
  }
}
