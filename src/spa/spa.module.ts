import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpaBodyComponent} from './spa-body/spa-body.component';
import {SpaHeaderComponent} from './spa-header/spa-header.component';
import {SpaContentComponent} from './spa-content/spa-content.component';
import {SpaFooterComponent} from './spa-footer/spa-footer.component';
import {SpaConfigService} from './services/spa-config.service';
import {IconBarComponent} from './icon-bar/icon-bar.component';
import {ScreenService} from './services/screen.service';
import {ScreenLargeDirective} from './directives/screen-large.directive';
import {ScreenSmallDirective} from './directives/screen-small.directive';
import {MenuService} from './services/menu.service';
import {MenuComponent} from './menus/menu/menu.component';
import {MenuItemComponent} from './menus/menu-item/menu-item.component';
import {RouterModule} from '@angular/router';
import {PopupMenuComponent} from './menus/popup-menu/popup-menu.component';
import {SignInComponent} from './users/sign-in/sign-in.component';
import {RegistrationComponent} from './users/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicFieldComponent} from './dynamicForms/dynamic-field/dynamic-field.component';
import {DynamicFormComponent} from './dynamicForms/dynamic-form/dynamic-form.component';
import {PanelComponent} from './panel/panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
  declarations: [SpaBodyComponent, SpaHeaderComponent, SpaContentComponent, SpaFooterComponent, IconBarComponent,
    ScreenLargeDirective, ScreenSmallDirective, MenuComponent, MenuItemComponent, PopupMenuComponent,
  SignInComponent, RegistrationComponent, DynamicFieldComponent, DynamicFormComponent, PanelComponent],
  exports: [SpaBodyComponent, DynamicFormComponent, PanelComponent, ScreenLargeDirective, ScreenSmallDirective],
  providers: [SpaConfigService, ScreenService, MenuService]
})

export class SpaModule { }
