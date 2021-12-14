import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OmdbResponse } from '../models/omdbResponse';
import { SearchModel } from '../models/searchModel';
import { SearchRequest } from '../models/searchRequest';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  //#region define variables
  omdbEndpoint = environment.api.url;
  private _searchSubject: BehaviorSubject<SearchRequest>;
  public search: Observable<SearchRequest>;
  private _watchsSubject: BehaviorSubject<SearchModel[]>;
  public watchs: Observable<SearchModel[]>;
  //#endregion
  constructor(private http: HttpClient) {
    // initialize
    this._searchSubject = new BehaviorSubject<SearchRequest>(new SearchRequest());
    this.search = this._searchSubject.asObservable();

    //get watch list stored from local storage
    let watchs = localStorage.getItem('watch');
    if (watchs == null)
      this._watchsSubject = new BehaviorSubject<SearchModel[]>([]);
    else {
      this._watchsSubject = new BehaviorSubject<SearchModel[]>(JSON.parse(watchs));
    }

    this.watchs = this._watchsSubject.asObservable();
  }

  SearchMovies(request: SearchRequest): Observable<OmdbResponse> {
    return this.http.get<OmdbResponse>(this.omdbEndpoint + "&s=" + request.Title + "&y=" + request.Year + "&type=" + request.Type)
  }

  SetSearchSubject(search: SearchRequest): void {
    this._searchSubject.next(search);
  }

  GetByID(id: string | null): Observable<SearchModel> {
    return this.http.get<SearchModel>(this.omdbEndpoint + "&i=" + id)
  }

  SetWatchsSubject(watchList: SearchModel[]): void {
    this._watchsSubject.next(watchList);
  }

}
