import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/posts/post.model';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Post[] | undefined;
  isLoading = true;
  selectedTag: string | null = null;
  allTags: string[] = [];

  constructor(
    private postsService: PostsService, public authService: AuthService, private route: ActivatedRoute, private titleService: Title, private meta: Meta, private location: Location) {
    this.meta.addTags([
      { name: 'description', content: 'My personal blog with some posts about tech and random thoughts.' },
      { name: 'author', content: 'Nery Brugnoni' },
      { name: 'keywords', content: 'Blog, Resume, Personal' }
    ]);

    this.titleService.setTitle('Brugner | Blog')
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.selectedTag = paramMap.get('tag');
      const posts = await this.postsService.getAll(this.selectedTag);
      this.posts = posts;
      this.isLoading = false;

      this.allTags = await this.postsService.getAllTags();
    });
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  public async getPosts(tag: string | null): Promise<void> {
    this.location.replaceState(tag ? `/blog/tag/${tag}` : '/blog');
    this.selectedTag = tag;
    this.isLoading = true;
    const posts = await this.postsService.getAll(tag);
    this.posts = posts;
    this.isLoading = false;
  }
}
