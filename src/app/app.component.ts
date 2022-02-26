import { Component } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public customSpinner = SpinnerComponent;

  constructor(
    public readonly configService: ConfigService
  ) {
  }
}
