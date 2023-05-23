import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class HttpService {
    
    constructor(private http: HttpClient){}

    postProject(project: {name: string, email: string, status: string}){
        return this.http.post('https://app-project-database-default-rtdb.europe-west1.firebasedatabase.app/projects.json', project);
    }

    getProjects(){
        const projArray: {name: string, email: string, status: string, id: string}[] = [];
        return this.http.get<{ [project: string]: {name: string, email: string, status: string, id: string} }>('https://app-project-database-default-rtdb.europe-west1.firebasedatabase.app/projects.json').pipe(map(responseData => {
            for (const project in responseData) {
                if(responseData.hasOwnProperty(project)){
                    projArray.push({...responseData[project], id: project})
                }
            } 
            return projArray;
        }))
    }

    deleteProject(projectId){
        return this.http.delete('https://app-project-database-default-rtdb.europe-west1.firebasedatabase.app/projects/'+projectId+'.json')
    }
}