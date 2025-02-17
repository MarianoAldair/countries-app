import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'ctr-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {

  public searchResults: Country[] = [];
  public isLoading: boolean = false;
  public initialSearchTerm: string = '';

  constructor(private _countriesService: CountriesService) { }

  ngOnInit() {
    this.searchResults = this._countriesService.cacheStore.byCapital.countries;
    this.initialSearchTerm = this._countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(searchTerm: string): void {
    this.isLoading = true;
    this._countriesService.searchByCapital(searchTerm).subscribe(resp => {
      this.searchResults = resp;
      this.isLoading = false;
    });
  }

}
