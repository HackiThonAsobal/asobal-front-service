import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { IProfileResponse } from 'src/app/models/profile-response.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  token: any;
  profileData: IProfileResponse;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly profileService: ProfileService
  ) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token') && sessionStorage.getItem('token') !== null) {
      this.getProfile();
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        this.token = params['token'];
        if (params['token'] !== null) {
          sessionStorage.setItem('token', params['token']);
        }         
      });
      if (!this.token) {
        this.router.navigate(['/login']);
      } else {
        this.getProfile();
      }
    }
  }

  getProfile() {
    this.profileService.postProfile().subscribe(
      (data: IProfileResponse) => {
        this.profileData = data;
        console.log('profileData', this.profileData);
      },
      (err) => {
        console.log('Error service profile', err.status);
        this.router.navigate(['/login']);
        sessionStorage.removeItem('token');
      }
    );
  }

}
