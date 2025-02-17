import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'ctr-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit {

  public country: Country | null = null;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _countriesService: CountriesService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      switchMap(({ id }) => this._countriesService.searchByAlphaCode(id))
    )
    .subscribe(country => {
      if(!country) return this._router.navigateByUrl('');
      this.country = country;
      return;
    })
  }

}
