import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IHero } from '../types/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  hero: IHero | undefined;

  constructor( private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => this.hero= hero);
  }

  goBack(): void {
    this.location.back();
  }
}
