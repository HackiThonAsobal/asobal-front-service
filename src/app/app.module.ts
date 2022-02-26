import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoreModule } from './core/core.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeDe from '@angular/common/locales/de';
import localePt from '@angular/common/locales/pt';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MenuComponent } from './components/menu/menu.component';
import { FeedComponent } from './components/feed/feed.component';

/**
 * appInt
 * @export
 * @const appInt
 */
const appInt = (config: ConfigService) => {
  return () => config.init();
};

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeDe, 'de');
registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    LoginComponent,
    ProfileComponent,
    MenuComponent,
    FeedComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    HammerModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInt,
      multi: true,
      deps: [ConfigService],
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
