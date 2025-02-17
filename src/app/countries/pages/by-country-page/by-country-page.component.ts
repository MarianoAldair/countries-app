import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'ctr-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {

  public searchResults: Country[] = [];
  public isLoading: boolean = false;
  public initialSearchTerm: string = '';

  constructor(private _countriesService: CountriesService) { }

  ngOnInit() {
    this.searchResults = this._countriesService.cacheStore.byCountry.countries;
    this.initialSearchTerm = this._countriesService.cacheStore.byCountry.term;
  }

  searchByCountry(searchTerm: string): void {
    this.isLoading = true;
    this._countriesService.searchByCountry(searchTerm).subscribe(resp => {
      this.searchResults = resp;
      this.isLoading = false;
    });
  }
}
