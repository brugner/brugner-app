import { Component, OnInit } from '@angular/core';
import { Post } from '../models/posts/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.component.html'
})
export class PostsComponent implements OnInit {

  isLoading = true;
  posts: Post[] = [];

  constructor(private postsService: PostsService) {

  }

  async ngOnInit() {
    this.posts = await this.postsService.getAll();
    this.isLoading = false;
  }
}
