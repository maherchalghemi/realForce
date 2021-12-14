import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchResultComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  { path: '**', redirectTo: '/search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
