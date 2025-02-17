import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, delay, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input('placeholder')
  public placeholder: string = '';

  @Input('initialSearchTerm')
  public initialSearchTerm?: string;

  @Output('onSearchTermEmmiter')
  public onSearchTermEmmiter: EventEmitter<string> = new EventEmitter();

  @Output('onSearchTermDebouncer')
  public onSearchTermDebouncer: EventEmitter<string> = new EventEmitter();

  @ViewChild('searchBox')
  public searchBox!: ElementRef<HTMLInputElement>;

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer.pipe(
      debounceTime(500),
    ).subscribe(value => {
      this.onSearchTermDebouncer.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  onEmitSearchTerm(): void {
    this.onSearchTermEmmiter.emit(this.searchBox.nativeElement.value);
  }

  onKeyPress(): void {
    const value = this.searchBox.nativeElement.value;
    this.debouncer.next(value);
  }

}
