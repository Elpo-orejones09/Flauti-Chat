import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {

  constructor(private router: Router) { }


  public redirectTo(url: String) {
    this.router.navigate([url]);
  }
}
