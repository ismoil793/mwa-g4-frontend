import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auto-card',
  templateUrl: './auto-card.component.html',
  styleUrls: ['./auto-card.component.css'],
})
export class AutoCardComponent {
  @Input() id!: string;
  @Input() title: string = '';
  @Input() price!: number;
  @Input() type: string = '';
  @Input() pictures!: { primary: string; interior: string };

  constructor(private router: Router) {}
  onClick() {
    console.log('test');
    this.router.navigate(['automobile', 'auto-detail', this.id]);
  }
}
