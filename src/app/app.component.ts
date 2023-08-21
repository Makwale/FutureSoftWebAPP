import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { Project } from './models/project.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projects: Project[] = [];
  isSearching = false;
  constructor(public projectService: ProjectService) {

  }

  ngOnInit() {
    //Getting projects via project service
    //We subscribe to getProjects method since it is returning observables
    this.projectService.getProjects().subscribe(response => {
      this.projects = response;
    })

  }

  //This method is used to search projects and groups
  searchProjectAndGroup(event: any) {

    this.projects = [];

    this.isSearching = true;

    if (event.target.value) {

      this.projectService.getProjects().subscribe(response => {

        let projects = response;

        //Filters projects and groups based on the valued entered
        projects = projects.filter(project => project.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 ||
          project.groups.some(group => group.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0))

        this.projects = projects;

        // Trasforming projects by filtering groups based on the value entered
        this.projects = this.projects.map(project => {
          let groups = project.groups.filter(group => group.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0)
          project.groups = groups;
          return project;
        });
      })

    } else {
      this.projectService.getProjects().subscribe(response => {
        this.projects = response;
        this.isSearching = false;
      })

    }
  }
}
