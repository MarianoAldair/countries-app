import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../types/region.type';

@Component({
  selector: 'ctr-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public searchResults: Country[] = [];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(private _countriesService: CountriesService) { }

  ngOnInit() {
    this.searchResults = this._countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(searchTerm: Region): void {
    this.isLoading = true;
    this.selectedRegion = searchTerm;
    this._countriesService.searchByRegion(searchTerm).subscribe(resp => {
      this.searchResults = resp;
      this.isLoading = false;
    });
  }

}
