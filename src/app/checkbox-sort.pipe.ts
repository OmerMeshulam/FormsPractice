import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkboxSort',
  pure: false
})
export class CheckboxSortPipe implements PipeTransform {
  transform(value: any, filteredStatus: string[]): any{
    if (value.length === 0 || filteredStatus.length === 0) {
      return value;
    }
    const filteredProjects = [];
    for (const status of filteredStatus){
      for (const project of value){
        if (project.status === status){
        filteredProjects.push(project);
      }
      }
    }
    return filteredProjects;
  } 

}
