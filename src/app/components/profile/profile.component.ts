import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { IProfileResponse } from 'src/app/models/profile-response.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { SseService } from 'src/app/services/sse.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  token: any;
  profileData: IProfileResponse;

  private onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly profileService: ProfileService,
    private readonly sseService: SseService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.sseService.getServerSendEvents().pipe(takeUntil(this.onDestroy$)).subscribe((event) => {
      const {data} = event
      this.notificationService.notify({
        title: data.title,
        message: data.description
      }, 10000)
    })

    console.log(sessionStorage.getItem('token'))
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

  ngOnDestroy(): void {
      
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
