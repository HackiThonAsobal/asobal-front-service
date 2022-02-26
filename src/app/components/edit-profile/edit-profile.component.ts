import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.editForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required])
      }
    );
  }

  editProfile() { }

}
