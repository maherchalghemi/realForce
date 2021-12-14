import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../shared/models/searchRequest';
import { OmdbService } from '../shared/services/omdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  types=[
    {value:"movie",text:"Movie"},
    {value:"serie",text:"Serie"}
  ]

  years=[
    {value:"2018"},
    {value:"2017"},
    {value:"2016"},
    {value:"2015"},
  ]
  yearSelected: string = "";
  typeSelected: string = "";
  title: string = ""

  txtYear="Year"
  txtType="Type"
  constructor(private omdbService:OmdbService) { }

  ngOnInit(): void {
  }

  // set year selected and  display text 
  setYear(year:string){
    this.yearSelected = year;
    this.txtYear = year
  }

  // set type selected and  display text 
  setType(type:string){
    this.typeSelected = type;
    this.txtType = type
  }
  setSearchRequest(){
    if(this.yearSelected != "" && this.typeSelected != ""){
      var searchRequest = new SearchRequest()
      searchRequest.Title = this.title
      searchRequest.Type = this.typeSelected
      searchRequest.Year = this.yearSelected

      // set search request in subject
      this.omdbService.SetSearchSubject(searchRequest);
    }
  }

}
