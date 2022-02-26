import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
import { ProfileService } from 'src/app/services/profile.service';
import { IProfileResponse } from 'src/app/models/profile-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;
  genders: any[] = [
    { id: 'male', description: 'Masculino' },
    { id: 'female', description: 'Femenino' }
  ];
  teams: any[] = [];
  profileData: IProfileResponse;

  constructor(
    private readonly teamService: TeamService,
    private readonly profileService: ProfileService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getTeams();
    this.profileService.profile$.subscribe(data => this.profileData = data);
    this.editForm = new FormGroup(
      {
        name: new FormControl(this.profileData.name, [Validators.required]),
        lastName: new FormControl(this.profileData.lastName, [Validators.required]),
        selectedGender: new FormControl(this.findGender(this.profileData.gender), [Validators.required]),
        selectedTeam: new FormControl('', [Validators.required]),
        date: new FormControl('')
      }
    );

  }

  editProfile() {
    const body = {
      name: this.editForm.controls['name'].value,
      lastName: this.editForm.controls['lastName'].value,
      gender: this.editForm.controls['selectedGender'].value,
      teamId: this.editForm.controls['selectedTeam'].value,
      birthDate: this.editForm.controls['date'].value
    }
    this.profileService.putProfile(body).subscribe(
      () => {
        this.router.navigate(['/asobal']);
      },
      (err) => {
        console.log('Error service put profile', err.status);
      }
    );
  }

  getTeams() {
    this.teamService.getTeam().subscribe(
      (data: any) => {
        console.log('teams', data);
        this.teams = data;
        this.editForm.get('selectedTeam').setValue(this.findTeam(this.profileData.teamId));
      },
      (err) => {
        console.log('Error service teams', err.status);
      }
    );
  }

  findGender(gender) {
    const value = this.genders.find(element => element['id'] === gender);
    return value['id'];
  }

  findTeam(id) {
    const value = this.teams.find(element => element['id'] === id);
    return value['id'];
  }

}