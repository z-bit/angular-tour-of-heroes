import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';

@Component({
    selector: 'hero-search',
    templateUrl: 'app/hero-search.component.html',
    styleUrls: ['app/hero-search.component.css'],
    providers: [ HeroSearchService]
})
export class HeroSearchComponent implements OnInit{
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router
    ) {}

    searchHero(term: string) {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300)          // wait for 300ms pause in events
            .distinctUntilChanged()     // ignore if next search term is same as previous
            .switchMap( term => term    // switch to new obsevable each time
                ? this.heroSearchService.search(term) // http search obsevable
                : Observable.of<Hero[]>([])           // observable of empty heroes
            )
            .catch( error => {
                console.log(error);     // TODO: real error handling
                return Observable.of<Hero[]>([]);
            })
        ;
    }

    gotoDetail(hero: Hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
