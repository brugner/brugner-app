import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  title: string = '';
  text: string = '';
  imageSrc: string = '';

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    try {
      const code = Number.parseInt(this.activatedRoute.snapshot.url[1].path, 10);

      switch (code) {
        case 0:
          this.title = 'Connection refused';
          this.text = 'Oops, it seems that the backend systems are sleeping right now. Try again in a moment.';
          this.imageSrc = 'assets/img/errors/crashed-rocket.jpg';
          break;

        case 401:
          this.title = 'You have no power here!';
          this.text = 'Mmm, it seems that you don\'t have permission to do that and I can\'t do much about it.';
          this.imageSrc = 'assets/img/errors/crashed-rocket.jpg';
          break;

        case 404:
          this.title = 'Page not found!';
          this.text = 'Ahh the infamous 404.. Sorry but the page you were looking for doesn\'t exist.';
          this.imageSrc = 'assets/img/errors/rocket-leaving-to-home.jpg';
          break;

        case 500:
          this.title = 'Ouch!';
          this.text = 'Ehm.. this is embarrasing.. Sorry but something went wrong. Try refreshing the page or navigating elsewhere.';
          this.imageSrc = 'assets/img/errors/crashed-rocket.jpg';
          break;
      }
    } catch (e) {
      this.title = 'Page not found!';
      this.text = 'Ahh the famous 404.. Sorry but the page you were looking for doesn\'t exist.';
      this.imageSrc = 'assets/img/errors/rocket-leaving-to-home.jpg';
    }
  }
}
