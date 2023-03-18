import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output() priceRangeFilterEvent = new EventEmitter<{
    min: number;
    max: number;
  }>();
  @Output() priceSortEvent = new EventEmitter<{
    sort: string;
  }>();
  filterForm!: FormGroup;
  sortForm!: FormGroup;
  invalid: boolean = false;

  private subscription!: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  // convenience getter for easy access to filterForm fields
  get f() {
    return this.filterForm.controls;
  }
  // min: ['', Validators.required, Validators.pattern('^[0-9]*$')],
  // max: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      min: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      max: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
    this.sortForm = this.formBuilder.group({
      sort: new FormControl('', Validators.required),
    });
  }

  onPriceRangeSubmit() {
    if (
      this.filterForm.invalid ||
      this.filterForm.value.min > this.filterForm.value.max
    ) {
      this.invalid = true;
      this.priceRangeFilterEvent.emit({ min: 0, max: 0 });
    } else {
      this.invalid = false;
      this.priceRangeFilterEvent.emit(this.filterForm.value);
    }
  }
  sortSubmit() {
    this.priceSortEvent.emit(this.sortForm.value);
  }
}
