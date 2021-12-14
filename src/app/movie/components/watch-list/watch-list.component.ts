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
  watchList: SearchModel[] = []
  constructor(private omdbService: OmdbService, public route: Router) { }

  ngOnInit(): void {
    this.getWatchList()
  }

  getWatchList() {
    this.omdbService.watchs.subscribe(res => {
      this.watchList = res
    })
  }

  openDetails(imdbID: string) {
    this.route.navigateByUrl('/details/' + imdbID)
  }

  remove(imdbID: string) {
    this.watchList = this.watchList.filter(w => w.imdbID != imdbID)
    localStorage.setItem("watch", JSON.stringify(this.watchList));
    this.omdbService.SetWatchsSubject(this.watchList)
  }

}
