import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];


  constructor(private http: HttpClient) { }

  getProjects() {
    // Fetching projects from REST API
    return this.http.get<Project[]>('https://localhost:7068/api/getprojects');
  }
}
