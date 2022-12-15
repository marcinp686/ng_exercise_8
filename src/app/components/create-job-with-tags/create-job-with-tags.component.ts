import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, share, shareReplay } from 'rxjs';
import { JobModel } from 'src/app/models/job.model';
import { JobTagModel } from 'src/app/models/jobTag.model';
import { MockapiService } from 'src/app/services/mockapi.service';

@Component({
  selector: 'app-create-job-with-tags',
  templateUrl: './create-job-with-tags.component.html',
  styleUrls: ['./create-job-with-tags.component.scss']
})
export class CreateJobWithTagsComponent implements OnInit {

  createJobFormGroup: FormGroup = new FormGroup({
    title       : new FormControl<string>('', Validators.required),
    description : new FormControl<string>('', Validators.required),
    tags        : new FormGroup({})
  })

  jobTags$!     : Observable<JobTagModel[]>;

  constructor(private mockApiService: MockapiService) { }

  ngOnInit(): void {
    this.jobTags$ = this.mockApiService.getTags().pipe(shareReplay());
    let tagsGroup = this.createJobFormGroup.get('tags') as FormGroup;
    this.jobTags$
      .pipe(
        map((tags: JobTagModel[]) =>
          tags.forEach((x) =>
            tagsGroup.addControl(`${x.id}`, new FormControl(false))
          )
        )
      )
      .subscribe();
  }

  onCreateJob() : void {
    let tagsFormGroup = this.createJobFormGroup.get('tags') as FormGroup;
    let tagIds        : number[] = [];

    // iterate over all FormControls in FormGroup and build an array of JobTagIds
    for(const controlName of Object.keys(tagsFormGroup.controls))
    {
      let control = tagsFormGroup.get(controlName);
      if(control?.value==true) tagIds.push(Number(controlName))          
    }

    // Create new JobModel with data from FormGroup
    let newJob: JobModel = {
      title       : this.createJobFormGroup.get('title')?.value,
      description : this.createJobFormGroup.get('description')?.value,
      jobTagIds   : tagIds
    };
    
    // Post new job
    this.mockApiService.createJob(newJob).subscribe();    
  }
}
