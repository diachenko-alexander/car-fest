import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SpaModule} from '../spa/spa.module';
import {AppHomeComponent} from './routes/app-home/app-home.component';
import {SettingsComponent} from './routes/settings/settings.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes/app.routes';
import {CarDetailComponent} from './routes/car-detail/car-detail.component';
import {CarListComponent} from './routes/car-list/car-list.component';
import {CarMaintComponent} from './routes/car-maint/car-maint.component';
import {AuthenticatedComponent} from './routes/authenticated/authenticated.component';
import {UserService} from './services/user.service';
import {UserApi} from '../spa/users/user-api';
import {AuthGuard} from './services/auth-guard.service';
import {AppDataService} from './services/app-data.service';
import { CarPanelComponent } from './panels/car-panel/car-panel.component';
import { ImagePanelComponent } from './panels/image-panel/image-panel.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AuthService, tokenGetter} from './services/auth.service';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {UploadImagesComponent} from './routes/upload-images/upload-images.component';
import { ViewImagesComponent } from './routes/view-images/view-images.component';
import { CarImagesComponent } from './routes/car-images/car-images.component';
import { ImageItemComponent } from './routes/image-item/image-item.component';
import { UserInfoComponent } from './routes/user-info/user-info.component';
import {JwtModule} from '@auth0/angular-jwt';
import { SpaModalComponent } from '../spa/spa-modal/spa-modal.component';
import {MdbModalService} from 'mdb-angular-ui-kit/modal';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    SettingsComponent,
    CarDetailComponent,
    CarListComponent,
    CarMaintComponent,
    AuthenticatedComponent,
    CarPanelComponent,
    ImagePanelComponent,
    UploadImagesComponent,
    ViewImagesComponent,
    CarImagesComponent,
    ImageItemComponent,
    UserInfoComponent,
    SpaModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SpaModule,
    HttpClientModule,
    OverlayModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost"],
        disallowedRoutes: [],
      }
    })
  ],
  providers: [
    UserService,
    {provide: UserApi, useExisting: UserService},
    AuthGuard,
    AppDataService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    MdbModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
