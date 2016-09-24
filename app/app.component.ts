import { Component } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['app/app.component.css'],
    template: `<div>
         <h1>{{ title }}</h1>

         <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
         </nav>

         <router-outlet></router-outlet>
    </div>`
})
export class AppComponent {
    title: string = 'Tour of Heroes';
}
