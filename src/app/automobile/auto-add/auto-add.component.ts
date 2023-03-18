import {Component, inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AutoCrudService} from "../auto-crud.service";
import {IAuto} from "../../interfaces/IAuto";

@Component({
  selector: 'app-auto-add',
  templateUrl: './auto-add.component.html',
  styleUrls: ['./auto-add.component.css']
})
export class AutoAddComponent {
  private autoCrudService = inject(AutoCrudService)

  formAddCar = inject(FormBuilder).group({
    title: '',
    vin: '',
    description: '',
    type: '',
    color: '#000000',
    interiorColor: '#000000',
  })

  clearForm() {
    this.formAddCar.reset()
  }

  createCar() {
    this.autoCrudService.addAutomobile(this.formAddCar.value as IAuto)
      .subscribe(response => {
        alert("Added successfully!")
        this.clearForm()
      })
  }
}
