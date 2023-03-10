import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { BlogComponent } from './blog/blog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  { path: 'about-me', component: AboutMeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/tag/:tag', component: BlogComponent },
  { path: 'blog/post/:slug', component: ViewPostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error/0', component: ErrorComponent },
  { path: 'error/401', component: ErrorComponent },
  { path: 'error/404', component: ErrorComponent },
  { path: 'error/500', component: ErrorComponent },

  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'posts/new', component: EditPostComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: EditPostComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'about-me', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
