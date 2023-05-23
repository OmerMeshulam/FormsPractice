import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { HttpService } from "./http.service";

@Injectable({'providedIn': 'root'})
export class ValidatorsService{

    constructor(private httpService: HttpService){}

    isProjNameExistValidator(control: FormControl){
        const promise = new Promise<any>(resolve => {
          this.httpService.getProjects().subscribe(projectsArray =>{
           if(projectsArray.length !== 0){
            projectsArray.forEach(project => {
             if (project.name === control.value){
               resolve({isProjNameExist: true});
             }
           })
           resolve(null);
         }
         else
         resolve(null);
           })
         })
         return promise;
     }
     isEmailExistValidator(control: FormControl){
        const promise = new Promise<any>(resolve => {
          this.httpService.getProjects().subscribe(projectsArray =>{
            if(projectsArray.length !== 0){
            projectsArray.forEach(project => {
             if (project.email === control.value){
               resolve({isEmailExist: true});
             }
            })
            resolve(null);
          }
          else
          resolve(null);
           })
         })
         return promise;
     }

}
  // isProjNameValid(control: FormControl){
  //   if (this.unavailableUsernames.indexOf(control.value) !== -1) {
  //     return {
  //       'isProjNameExist': true
  //     };
  //   }
  //   else
  //   return null;
  // }