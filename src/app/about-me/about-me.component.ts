import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html'
})
export class AboutMeComponent {

  constructor(private titleService: Title, private meta: Meta) {
    this.meta.addTags([
      { name: 'description', content: 'My personal blog with some posts about tech and random thoughts.' },
      { name: 'author', content: 'Nery Brugnoni' },
      { name: 'keywords', content: 'Blog, Resume, Personal' }
    ]);

    this.titleService.setTitle('Brugner | About me')
  }
}
