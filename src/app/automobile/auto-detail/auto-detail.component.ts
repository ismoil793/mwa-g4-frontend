import {Component, inject} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AutoCrudService} from "../auto-crud.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auto-detail',
  templateUrl: './auto-detail.component.html',
  styleUrls: ['./auto-detail.component.css']
})
export class AutoDetailComponent {
  constructor(private route: ActivatedRoute) { }
  private autoCrudService = inject(AutoCrudService)
  private authService = inject(AuthService)
  autoDetails:any = {pictures: [{}]}
  activeImageIdx:number = 0
  autoId: string = ''
  shouldShowOfferBtn: boolean = true

  changeActiveImage(index: number) {
    if(this.autoDetails?.pictures?.length) {
      this.activeImageIdx = index
    }
  }

  buyAutomobile() {
    const comment = prompt("Write down your offer comment", 'I am interested to buy this car')
    if (comment) {
      this.autoCrudService.makeOffer(this.autoId, {comment}).subscribe(res => {
        alert('Offer sent!')
      })
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') || ''
      this.autoId = id;
      this.autoCrudService.getAutoById(id).subscribe(response => {
        this.autoDetails = response.data;

        const currentUserId = this.authService.getUserId()
        const ownerId = this.autoDetails.owner?.ownerId
        const alreadyMadeOffer = this.autoDetails.offers?.findIndex((offer:any) => offer.userId === currentUserId) > -1

        if(currentUserId === ownerId || alreadyMadeOffer) {
          this.shouldShowOfferBtn = false
        }
      })
    });
  }
}
