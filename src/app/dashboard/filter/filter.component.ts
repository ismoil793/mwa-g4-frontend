import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  invalid: boolean = false;

  private subscription!: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  // min: ['', Validators.required, Validators.pattern('^[0-9]*$')],
  // max: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  ngOnInit() {
    this.form = this.formBuilder.group({
      min: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      max: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onSubmit() {
    if (this.form.invalid || this.form.value.min > this.form.value.max) {
      this.invalid = true;
      this.priceRangeFilterEvent.emit({ min: 0, max: 0 });
    } else {
      this.invalid = false;
      this.priceRangeFilterEvent.emit(this.form.value);
    }
  }
}
