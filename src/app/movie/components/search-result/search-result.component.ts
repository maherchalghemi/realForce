import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchModel } from '../../../shared/models/searchModel';
import { OmdbService } from '../../../shared/services/omdb.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  movies: SearchModel[] = []
  watchList: SearchModel[] = []
  isListed: boolean = false
  subscription !: Subscription
  constructor(private omdbService: OmdbService, public route: Router) { }

  ngOnInit(): void {
    this.searchMovies()

    this.getWatchList()
  }
  ngOnDestroy(): void {
    if (this.subscription != null || this.subscription != undefined)
      this.subscription.unsubscribe()
  }
  // search movie by all filter (year/type/title) from subject
  searchMovies() {
    this.omdbService.search.subscribe(search => {
      this.subscription = this.omdbService.SearchMovies(search).subscribe(res => {
        this.movies = res.Search
      })
    })
  }

  // open detail page
  openDetails(imdbID: string) {
    this.route.navigateByUrl('/details/' + imdbID)
  }

  // add movie in my watch list
  addMovie(movie: SearchModel) {
    this.watchList.unshift(movie)
    localStorage.setItem("watch", JSON.stringify(this.watchList));
    this.omdbService.SetWatchsSubject(this.watchList)
  }

  // watch
  getWatchList() {
    this.omdbService.watchs.subscribe(res => {
      this.watchList = res
    })
  }

  checkExistMovieInWatchList(imdbID: string): boolean {
    if (this.watchList.filter(w => w.imdbID == imdbID).length > 0)
      return true;

    return false;
  }

}
