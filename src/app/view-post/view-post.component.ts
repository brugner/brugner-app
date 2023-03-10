import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/posts/post.model';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html'
})
export class ViewPostComponent implements OnInit {

  post: Post = new Post();
  allTags: string[] = [];
  isLoading = true;
  pageId: string = '';

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.post = await this.postsService.getBySlug(slug);
    this.isLoading = false;

    if (this.post.id === 0) {
      this.router.navigateByUrl('/error/404');
    }

    this.pageId = 'blog/post/' + this.post.slug;
    this.allTags = await this.postsService.getAllTags();
  }

  async deletePost() {
    if (confirm('Careful, deletion is permanent. Are you sure you want to delete this post?')) {
      await this.postsService.delete(this.post.id);
      this.toastrService.success('Post deleted', 'Brugner');
      this.router.navigateByUrl('/blog');
    }
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
}
