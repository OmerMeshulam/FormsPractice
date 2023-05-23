import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpService } from './http.service';
import { Project } from './project.model';
import { ValidatorsService} from './validators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forms-app';
  statusList = ['Not Started', 'In Progress', 'Done'];
  projects: Project[] = [];
  project: Project;
  checkedStatuses = [];
  checkedStatus: string;
  isSent = false;
  isDeleting = false;
  error = false;
  isLoading = false;
  deletedProjectsId: string[] = [];
  errorDeletedProjectsId: string[] = [];
  projectForm: FormGroup;

  constructor(private httpService: HttpService, private appValidators: ValidatorsService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.appValidators.isProjNameExistValidator.bind(this)),
      email: new FormControl(null, [Validators.required, Validators.email], this.appValidators.isEmailExistValidator.bind(this)),
      status: new FormControl('Not Started'),
      statusCheckboxs: new FormArray([new FormControl(false), new FormControl(false), new FormControl(false)])
    });
    this.httpService.getProjects().subscribe(response =>{
      this.isLoading = false;
      this.projects = response;
   }, err =>{
     console.log(err);
     let intervalId = null;
     const refreshProjects = () =>{
      this.error = false
      this.isLoading = true;
      this.httpService.getProjects().subscribe(response =>{
      this.isLoading = false;
      this.projects = response;
      clearInterval(intervalId);
      }, err =>{
        this.isLoading = false;
        this.error = true;
        console.log(err);
      })
    }
    intervalId = setInterval(refreshProjects, 5000);
  });
  }
   onChecked(checkbox){
    if (checkbox.checked) {
      this.checkedStatuses.push(checkbox.value)
    }
    else{
      if(!checkbox.checked){
        const statusIndex = this.checkedStatuses.indexOf(checkbox.value);
        this.checkedStatuses.splice(statusIndex, 1);
      }
    }
  }
  onSubmit(){
    this.isLoading = true;
    if (this.projectForm.valid) {
      this.project = {
        name: this.projectForm.controls['projectName'].value,
        email: this.projectForm.controls['email'].value,
        status: this.projectForm.controls['status'].value
      }
      this.httpService.postProject(this.project).subscribe(() =>{
        this.httpService.getProjects().subscribe(response =>{
          this.isLoading = false;
        this.projects = response;
     }, err =>{console.log(err)});
     this.projectForm.reset({
       projectName: null,
       email: null,
       status: 'Not Started',
       statusCheckboxs: [false, false, false]
     });
      }, err =>{
        console.log(err)})
      
      setTimeout(() => {
        this.isSent = false;
      }, 2000);
      this.isSent = true;
    }
    else{
      this.isLoading = false;
      alert('The Form is Invalid...')
    }
  }
  removeProject(projectId){
    // this.isDeleting = true;
    this.deletedProjectsId.push(projectId);
    setTimeout(() => {
      this.httpService.deleteProject(projectId).subscribe(() =>{
          // this.isDeleting = false;
          this.deletedProjectsId = this.deletedProjectsId.filter(id => id !== projectId);
          this.isLoading = true;
        this.httpService.getProjects().subscribe(response =>{
          this.isLoading = false;
          this.projects = response;
     }, err =>{
       this.isLoading = false;
       console.log(err);
       this.error = true;
      });
    }, err =>{
      this.deletedProjectsId = this.deletedProjectsId.filter(id => id !== projectId);
      console.log(err);
      this.errorDeletedProjectsId.push(projectId);
      setTimeout(() => {
       this.errorDeletedProjectsId = this.errorDeletedProjectsId.filter(id => id !== projectId);
       }, 2000); 
    }) 
    }, 2000);
    
  }
  setStatusClasses(status){
    return {
    'not-started': status === 'Not Started',
    'in-progress': status === 'In Progress',
    'done': status === 'Done'
    };
  }
}
