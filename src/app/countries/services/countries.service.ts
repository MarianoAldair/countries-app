import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { catchError, delay, map, Observable, of, tap } from "rxjs";
import { Country } from "../interfaces/country.interface";
import { CacheStore } from "../interfaces/cache-store.interface";
import { Region } from "../types/region.type";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { countries: [] },
  };

  constructor(private _http: HttpClient) {
    this.loadLocalStorage();
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this._http.get<Country[]>(url)
    .pipe(
      delay(1000),
      catchError(() => {
        return of([])
      }),
    );
  };

  private saveLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadLocalStorage() {
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  searchByCapital(searchTerm: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${searchTerm}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {
        term: searchTerm,
        countries
      }),
      tap(() => this.saveLocalStorage()),
    );
  };

  searchByCountry(searchTerm: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${searchTerm}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountry = {
        term: searchTerm,
        countries
      }),
      tap(() => this.saveLocalStorage()),
    );
  };

  searchByRegion(searchTerm: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${searchTerm}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {
        region: searchTerm,
        countries
      }),
      tap(() => this.saveLocalStorage()),
    );
  };

  searchByAlphaCode(alphaCode: string): Observable<Country | null> {
    return this._http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`).pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(() => {
        return of(null)
      })
    );
  };

}
