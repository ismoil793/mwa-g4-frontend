import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auto-card',
  templateUrl: './auto-card.component.html',
  styleUrls: ['./auto-card.component.css'],
})
export class AutoCardComponent implements OnInit {
  @Input() id!: string;
  @Input() title: string = '';
  @Input() price!: number;
  @Input() type: string = '';
  @Input() pictures: { fileName: string }[] = [];

  filePathName!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.pictures.length > 0) {
      this.filePathName = this.pictures[0].fileName;
    } else {
      this.filePathName = 'image-1.jpg';
    }
  }
  onClick() {
    this.router.navigate(['automobile', 'auto-detail', this.id]);
  }
}
