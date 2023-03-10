import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  SESSION_STORAGE,
  StorageService,
  StorageTranscoders
} from 'ngx-webstorage-service';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostForCreation } from '../models/posts/post-for-creation.model';
import { PostForUpdate } from '../models/posts/post-for-update.model';
import { Post } from '../models/posts/post.model';

@Injectable()
export class PostsService {
  private readonly cacheKey = 'bn-posts';

  constructor(
    @Inject(SESSION_STORAGE) private storageService: StorageService,
    private httpClient: HttpClient
  ) { }

  async getAll(tag?: string | null): Promise<Post[]> {
    if (this.storageService.has(this.cacheKey)) {
      const posts =
        this.storageService.get<Post[]>(
          this.cacheKey,
          StorageTranscoders.JSON
        ) || [];

      if (tag) {
        return Promise.resolve<Post[]>(
          posts.filter((post) => post.tags.some((t) => t === tag))
        );
      } else {
        return Promise.resolve<Post[]>(posts);
      }
    }

    return await firstValueFrom(this.httpClient
      .get<Post[]>('posts')
      .pipe(
        map((posts: Post[]) => {
          this.storageService.set(this.cacheKey, posts);

          if (tag) {
            return posts.filter((post) => post.tags.some((t) => t === tag));
          } else {
            return posts;
          }
        })
      ));
  }

  async getAllTags(): Promise<string[]> {
    const cacheKey = 'bn-tags';

    if (this.storageService.has(cacheKey)) {
      const tags =
        this.storageService.get<string[]>(cacheKey, StorageTranscoders.JSON) ||
        [];
      return Promise.resolve<string[]>(tags);
    }

    return await firstValueFrom(this.httpClient
      .get<string[]>('posts/tags')
      .pipe(
        map((tags: string[]) => {
          this.storageService.set(cacheKey, tags);
          return tags;
        })
      ));
  }

  async getBySlug(slug: string): Promise<Post> {
    if (this.storageService.has(this.cacheKey)) {
      const posts =
        this.storageService.get<Post[]>(
          this.cacheKey,
          StorageTranscoders.JSON
        ) || [];
      const post = posts.find((post) => post.slug === slug) || new Post();
      return Promise.resolve<Post>(post);
    }

    return await firstValueFrom(this.httpClient
      .get<Post[]>('posts')
      .pipe(
        map((posts: Post[]) => {
          this.storageService.set(this.cacheKey, posts);

          const post = posts.find((post) => post.slug === slug) || new Post();
          return post;
        })
      ));
  }

  async getById(id: number): Promise<Post> {
    return await firstValueFrom(this.httpClient.get<Post>(`posts/${id}`));
  }

  async delete(id: number): Promise<void> {
    return this.httpClient
      .delete(`posts/${id}`)
      .toPromise()
      .then(() => {
        this.storageService.remove(this.cacheKey);
        return;
      });
  }

  async create(post: PostForCreation): Promise<Post> {
    const formData = this.getFormDataFromPost(post);

    return await firstValueFrom(this.httpClient
      .post<Post>('posts', formData))
      .then((post: Post) => {
        this.storageService.remove(this.cacheKey);
        return post;
      });
  }

  async update(id: number, post: PostForUpdate): Promise<Post> {
    const formData = this.getFormDataFromPost(post);

    return await firstValueFrom(this.httpClient
      .put<Post>(`posts/${id}`, formData))
      .then((post: Post) => {
        this.storageService.clear();
        return post;
      });
  }

  private getFormDataFromPost(post: PostForUpdate | PostForCreation): FormData {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('summary', post.summary);
    formData.append('content', post.content);
    formData.append('isDraft', String(post.isDraft));

    for (let i = 0; i < post.tags.length; i++) {
      formData.append('tags[' + i + ']', post.tags[i]);
    }

    return formData;
  }
}
