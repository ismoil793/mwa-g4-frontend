import {Component, inject} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AutoCrudService} from "../auto-crud.service";

@Component({
  selector: 'app-auto-detail',
  templateUrl: './auto-detail.component.html',
  styleUrls: ['./auto-detail.component.css']
})
export class AutoDetailComponent {
  constructor(private route: ActivatedRoute) { }
  private autoCrudService = inject(AutoCrudService)
  autoDetails:any = {pictures: [{}]}
  activeImageIdx:number = 0

  changeActiveImage(index: number) {
    if(this.autoDetails?.pictures?.length) {
      this.activeImageIdx = index
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') || ''
      this.autoCrudService.getAutoById(id).subscribe(response => {
        this.autoDetails = response.data;
      })
    });
  }
}
