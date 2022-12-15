import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, combineLatest } from 'rxjs';
import { JobModel } from '../models/job.model';
import { JobTagModel } from '../models/jobTag.model';
import { RoleModel } from '../models/role.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MockapiService {

  constructor(private httpClient: HttpClient) {}

  // User roles
  getRoles(): Observable<RoleModel[]> {
    return this.httpClient.get<RoleModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/roles');
  }

  // Users
  addUser(user: UserModel) : Observable<void> {
    return this.httpClient.post<void>('https://636ce2d8ab4814f2b2712854.mockapi.io/user', user);
  }

  // Jobs
  getJobs(): Observable<JobModel[]> {
    let jobs$: Observable<JobModel[]>;
    let tags$: Observable<JobTagModel[]>;

    jobs$ = this.httpClient.get<JobModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts');
    tags$ = this.httpClient.get<JobTagModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags').pipe(map(
      (tags: JobTagModel[]) => tags.map( (tag)=>({id: Number(tag.id),name: tag.name}))
    ));

    let jobsWithTags: Observable<JobModel[]>;

    jobsWithTags = combineLatest([jobs$, tags$]).pipe(
      map(([jobs, tags]) =>
        jobs.map(
          (job) =>
            ({
              ...job,
              jobTags: tags
                .filter((tag) => job.jobTagIds.includes(tag.id))
                .map((tag) => tag.name),
            } as JobModel)
        )
      )
    );
    
    return jobsWithTags;
  }

  getJob(id: number): Observable<JobModel> {
    return this.httpClient.get<JobModel>(`https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts/${id}`);
  }

  createJob(job: JobModel) : Observable<any> {
    return this.httpClient.post<JobModel>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts', job);
  }

  getTags() : Observable<JobTagModel[]> {
    return this.httpClient.get<JobTagModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags');
  }

}
