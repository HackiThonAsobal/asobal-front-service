import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  actionFiredFromSnackbar$: Subject<string> = new Subject<string>();

  private currentSnackbar: MatSnackBarRef<SnackbarComponent>;

  constructor(private snackBar: MatSnackBar) {}

  emitActionFired(action: string) {
    this.actionFiredFromSnackbar$.next(action);
  }

  getActionFired() {
    return this.actionFiredFromSnackbar$.asObservable();
  }

  closeSnackbar() {
    this.currentSnackbar?.dismiss();
  }

  isCurrentSnackbarActive(): boolean {
    return !!this.currentSnackbar;
  }

  notify(data: any, interval?: number): void {
    const sb = this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      duration: interval ? interval : 0, // infinite - no close
      panelClass: 'success',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    this.subscribeToDismiss(sb);
    this.currentSnackbar = sb;
  }

  private subscribeToDismiss(snackBar: MatSnackBarRef<SnackbarComponent>) {
    snackBar.afterDismissed().subscribe(() => {
      this.currentSnackbar = null;
    });
  }
}