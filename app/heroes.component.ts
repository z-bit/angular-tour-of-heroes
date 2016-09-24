import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'heroes',
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html',
    providers: [HeroService]
})
export class HeroesComponent implements OnInit{
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private router: Router,
        private heroService: HeroService
    ) {}

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService
            .getHeroes()
            //.getHeroesSlowly() //alternative to getHeroes() - delays result for 2 seconds
            .then(heroes => this.heroes = heroes)
        ;
    }

    onSelect(hero) {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

}


