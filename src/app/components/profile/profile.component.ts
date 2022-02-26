import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { IProfileResponse } from 'src/app/models/profile-response.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { SseService } from 'src/app/services/sse.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
  ) {}

  ngOnInit(): void {
    this.sseService
      .getServerSendEvents()
      .pipe(
        finalize(() => this.sseService.closeEventSource()),
        takeUntil(this.onDestroy$)
      )
      .subscribe((event) => {
        const data = JSON.parse(event.data);
        this.notificationService.notify(
          {
            title: data.title,
            message: data.description,
          }
        );
      });

    console.log(sessionStorage.getItem('token'));
    if (
      !!sessionStorage.getItem('token')
    ) {
      this.getProfile();
    } else {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.token = params['token'];
        if (!!params['token']) {
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
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getProfile() {
    this.profileService.postProfile().subscribe(
      (data: IProfileResponse) => {
        this.profileData = data;
        console.log('profileData', this.profileData);
        this.profileService.sendProfile(this.profileData);
        if (!this.profileData.teamId) {
          this.router.navigate(['/asobal/profile']);
        }
      },
      (err) => {
        console.log('Error service profile', err.status);
        this.router.navigate(['/login']);
        sessionStorage.removeItem('token');
      }
    );
  }
}
