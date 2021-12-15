import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchRequest } from '../../../shared/models/searchRequest';
import { OmdbService } from '../../../shared/services/omdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //#region define variables
  types = [
    { value: "movie", text: "Movie" },
    { value: "series", text: "Serie" }
  ]

  years = [
    { value: "2018" },
    { value: "2017" },
    { value: "2016" },
    { value: "2015" },
  ]
  yearSelected: string = "";
  typeSelected: string = "";

  txtYear = "Year"
  txtType = "Type"
  form:FormGroup
  //#endregion
  constructor(private omdbService: OmdbService, private fb: FormBuilder) { 
    this.form = fb.group({
      title:["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.form.get("title")?.valueChanges.subscribe(t => {
      this.setSearchRequest()
      })
  }

  // set year selected and  display text 
  setYear(year: string) {
    this.yearSelected = year;
    this.txtYear = year
    if (this.form.valid)
      this.setSearchRequest()
  }

  // set type selected and  display text 
  setType(value: string, text:string) {
    this.typeSelected = value;
    this.txtType = text
    if (this.form.valid)
      this.setSearchRequest()

  }
  setSearchRequest() {
    if (this.yearSelected != "" && this.typeSelected != "") {
      var searchRequest = new SearchRequest()
      searchRequest.Title = this.form.get("title")?.value
      searchRequest.Type = this.typeSelected
      searchRequest.Year = this.yearSelected

      // set search request in subject
      this.omdbService.SetSearchSubject(searchRequest);
    }
  }

}
