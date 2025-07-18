import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teacher {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  genero: string;
  cpfProfessor: string;
}

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
