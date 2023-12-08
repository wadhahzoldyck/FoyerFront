import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvenementService } from '../../service/evenement.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-modal-evenement',
  templateUrl: './add-modal-evenement.component.html',
  styleUrls: ['./add-modal-evenement.component.css']
})
export class AddModalEvenementComponent {
  eventForm: FormGroup; 
  selectedFile?: File;
  
  constructor(
    private fb: FormBuilder,
    private evenements: EvenementService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
    private _dialog: MatDialog
    
  ) {
    this.eventForm = this.fb.group({
      nomEvenement: [''],
      lieu: [''],
      dateEvenement:[''],
      description:[''],
    });
  }

  resetForm() {
    this.eventForm.reset();
    this.selectedFile = undefined;
  }
  

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onAddEvenement() {
    const formData = this.eventForm.value;
    const imageFile = this.selectedFile;
  
    if (imageFile) {
      this.evenements.addEvenement(formData, imageFile ).subscribe(
        (response) => {
          this.toastr.success('Evenement ajoutée avec succès');
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
      this.router.navigate([`admin/evenement`]);
 
  }


}