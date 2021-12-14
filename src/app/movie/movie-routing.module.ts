import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DetailsComponent } from "./components/details/details.component";
import { SearchResultComponent } from "./components/search-result/search-result.component";

const appRoutes: Route[] = [
    { path: '/', redirectTo: '/search' },
    {
        path: 'search',
        component: SearchResultComponent,
        pathMatch: 'full',

    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [],
})

export class MovieRoutingModule { }