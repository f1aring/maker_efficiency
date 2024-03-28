import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { uk_UA } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MultiStepComponent } from './components/multi-step/multi-step.component';
import { ImageLoaderComponent } from './components/image-loader/image-loader.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TesterComponent } from './components/tester/tester.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { RedZoomModule } from 'ngx-red-zoom';
import { ImageZoomComponent } from './components/image-zoom/image-zoom.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(uk);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MultiStepComponent,
    ImageLoaderComponent,
    TesterComponent,
    DynamicFormComponent,
    ImageZoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzFormModule,
    NgxImageZoomModule,
    RedZoomModule ,
    NzModalModule,
    HttpClientModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: uk_UA },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
