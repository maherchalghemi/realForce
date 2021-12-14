import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './movie/components/details/details.component';
import { SearchResultComponent } from './movie/components/search-result/search-result.component';

const routes: Routes = [
 
    {
        path: 'search',
        component: SearchResultComponent,
        pathMatch: 'full',

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
