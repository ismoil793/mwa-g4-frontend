import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

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
  @Input() pictures!: { fileName: string }[];

  rootUrl = environment.imageRootUrl;
  filePathName!: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filePathName = 'image-1.jpg';
    if (this.pictures && this.pictures.length > 0) {
      this.filePathName = this.pictures[0].fileName;
    }
  }
  onClick() {
    this.router.navigate(['automobile', 'auto-detail', this.id]);
  }
}
