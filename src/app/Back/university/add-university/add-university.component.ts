import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UniversityService } from '../../service/university.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent {
    
  universityForm: FormGroup;
  selectedFile?: File;
  constructor(
    private fb: FormBuilder,
    private universiteS: UniversityService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
  //  private modalService: NgbModal
    
  ) {
    this.universityForm = this.fb.group({
      nomUniversite: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      adresse: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      description: new FormControl('',[Validators.required, Validators.maxLength(140)]),
      image:new FormControl('', Validators.required)
    });
  }

  resetForm() {
    this.universityForm.reset();
    this.selectedFile = undefined;
  }
  

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onAddUniversite() {
    const formData = this.universityForm.value;
    const imageFile = this.selectedFile;
    console.log(formData);
  
    if (imageFile) {
      this.universiteS.addUniversiteWithImage(formData, imageFile).subscribe(
        (response) => {
          this.toastr.success('Université ajoutée avec succès');
          this.resetForm();
         
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'université', error);
          this.toastr.error('Erreur lors de l\'ajout de l\'université');
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message?: string;

 /**  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }*/


}