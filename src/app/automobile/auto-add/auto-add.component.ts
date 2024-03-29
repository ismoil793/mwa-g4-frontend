import {Component, inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AutoCrudService} from "../auto-crud.service";
import {IAuto} from "../../interfaces/IAuto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auto-add',
  templateUrl: './auto-add.component.html',
  styleUrls: ['./auto-add.component.css']
})
export class AutoAddComponent {
  private autoCrudService = inject(AutoCrudService)
  private router = inject(Router)
  myFiles: any = []
  previews: any = []
  hasError: boolean = false

  formAddCar = inject(FormBuilder).group({
    title: '',
    vin: '',
    description: '',
    type: '',
    color: '',
    interiorColor: '',
    long: '',
    lat: '',
    price: '',
    state: '',
    city: '',
    zipcode: '',
  })

  onFileChange(event:any) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      this.myFiles.push(file);

      const reader = new FileReader();
      reader.onload = e => {
        this.previews.push(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  autoCreateSuccess(id: string) {
    this.previews = []
    this.myFiles = []
    this.formAddCar.reset()
    this.router.navigate(['automobile', 'auto-detail', id]);
  }

  createCar() {
    if(this.formAddCar.valid) {
      this.hasError = false
      this.autoCrudService.addAutomobile(this.formAddCar.value as IAuto)
        .subscribe(response => {
          const {_id} = response.data
          if(this.myFiles.length) {
            const formData = new FormData();
            for (let i = 0; i < this.myFiles.length; i++) {
              formData.append("picture", this.myFiles[i]);
            }
            this.autoCrudService.uploadAutoImages(_id, formData).subscribe(() => {
              this.autoCreateSuccess(_id)
            })
          } else {
            this.autoCreateSuccess(_id)
          }
        })
    } else {
      this.hasError = true
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
