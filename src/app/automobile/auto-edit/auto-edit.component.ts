import {Component, inject} from '@angular/core';
import {AutoCrudService} from "../auto-crud.service";
import {FormBuilder} from "@angular/forms";
import {IAuto} from "../../interfaces/IAuto";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-auto-edit',
  templateUrl: './auto-edit.component.html',
  styleUrls: ['./auto-edit.component.css']
})
export class AutoEditComponent {
  private autoCrudService = inject(AutoCrudService)
  private router = inject(Router)
  autoId: string = ''

  formUpdate = inject(FormBuilder).group({
    title: '',
    vin: '',
    description: '',
    type: '',
    color: '',
    interiorColor: '',
    price: '',
    lat: '',
    long: '',
    state: '',
    city: '',
    zipcode: ''
  })

  clearForm() {
    this.formUpdate.reset()
  }

  constructor(private route: ActivatedRoute) { }

  updateCar() {
    if(this.formUpdate.valid) {
      this.autoCrudService.updateAutoById(this.autoId, this.formUpdate.value as IAuto)
        .subscribe(response => {
          alert("Updated successfully!")
          this.fetchAutoById()
        })
    }
  }

  deleteAuto() {
    if (confirm('Are you sure?')) {
      this.autoCrudService.deleteAutomobile(this.autoId).subscribe(() => {
        this.router.navigate(['']);
      })
    } else {
      // Do nothing!
    }
  }

  fetchAutoById() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') || ''
      this.autoId = id
      this.autoCrudService.getAutoById(id).subscribe(response => {
        const {location, ...rest} = response.data
        let lat = ''
        let long = ''
        if(location.length > 1) {
          long = location[0]
          lat = location[1]
        }
        this.formUpdate.patchValue({...rest, lat, long})
      })
    });
  }

  ngOnInit() {
    this.fetchAutoById()
  }
}
