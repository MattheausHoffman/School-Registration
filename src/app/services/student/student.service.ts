import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  genero: string;
  cpfAluno: string;
  serieAno: string;
  semestre: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  createStudent(student: Student): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }
}
