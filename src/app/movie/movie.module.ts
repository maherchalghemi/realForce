import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { DetailsComponent } from './components/details/details.component';



@NgModule({
  declarations: [
    SearchResultComponent,
    WatchListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    // MovieRoutingModule,
    FormsModule,
  ],
  exports     : [ 
    SearchResultComponent,
    WatchListComponent,
    DetailsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MovieModule { }
