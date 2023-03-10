import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DisqusModule } from 'ngx-disqus';
import { ToastrModule } from 'ngx-toastr';
import { AboutMeComponent } from './about-me/about-me.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt-auth.interceptor';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RawHtmlPipe } from './pipes/raw-html.pipe';
import { ReadingTimePipe } from './pipes/reading-time.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { PostsComponent } from './posts/posts.component';
import { AuthService } from './services/auth.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { MonitoringService } from './services/monitoring.service';
import { PostsService } from './services/posts.service';
import { ViewPostComponent } from './view-post/view-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    BlogComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ReadingTimePipe,
    TimeAgoPipe,
    RawHtmlPipe,
    YesNoPipe,
    ViewPostComponent,
    ErrorComponent,
    EditPostComponent,
    PostsComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ closeButton: true, positionClass: 'toast-bottom-right' }),
    AutocompleteLibModule,
    DisqusModule.forRoot('brugner')
  ],
  providers: [
    AuthService,
    PostsService,
    MonitoringService,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
