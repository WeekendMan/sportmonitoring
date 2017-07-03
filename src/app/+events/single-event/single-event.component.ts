import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'single-event',
  templateUrl: './single-event.component.html'
})

export class SingleEventComponent implements OnInit {
  public eventID: number;
  public stageID: number;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventID = parseInt(params['eventID'], 10);
      this.stageID = parseInt(params['stageID'], 10);

      if (!this.eventID) {
        this.router.navigateByUrl('/events');
      }
    });
  }
}
