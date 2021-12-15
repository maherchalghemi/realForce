import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchModel } from '../../../shared/models/searchModel';
import { OmdbService } from '../../../shared/services/omdb.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  //#region define variables
  watchList: SearchModel[] = [];
  //#endregion
  constructor(private omdbService: OmdbService, public route: Router) { }

  ngOnInit(): void {
    this.getWatchList();
  }

  // get watch stored in Behavor subject
  getWatchList() {
    this.omdbService.watchs.subscribe(res => {
      this.watchList = res;
    })
  }
  // navigate to details page
  openDetails(imdbID: string) {
    this.route.navigateByUrl('/details/' + imdbID);
  }

  // remove movie from watch list and update local storage and bahavor subject
  remove(imdbID: string) {
    this.watchList = this.watchList.filter(w => w.imdbID != imdbID);
    localStorage.setItem("watch", JSON.stringify(this.watchList));
    this.omdbService.SetWatchsSubject(this.watchList);
  }

}
