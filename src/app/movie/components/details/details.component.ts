import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchModel } from '../../../shared/models/searchModel';
import { OmdbService } from '../../../shared/services/omdb.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  //#region define variables
  imdbID: string | null = "";
  movieSelected: SearchModel;
  subscription !: Subscription;
  //#endregion
  constructor(private omdbService: OmdbService, private _Activatedroute: ActivatedRoute) {
    this.movieSelected = new SearchModel();
  }
  ngOnDestroy(): void {
    // interrupt the processing carried out by the Observable subscription
    if (this.subscription != null || this.subscription != undefined)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // get imdbID from route param
    this.imdbID = this._Activatedroute.snapshot.paramMap.get("id");
    this.getById();
  }

  // get movie from server by imdbID
  getById() {
    this.subscription = this.omdbService.GetByID(this.imdbID).subscribe(res => {

      this.movieSelected = res;
    })
  }
}
