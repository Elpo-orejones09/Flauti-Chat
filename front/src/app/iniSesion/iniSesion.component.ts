import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './iniSesion.component.html',
  styleUrls: ['./iniSesion.component.scss'],
})
export class IniSesionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  public redirectTo(url: string) {
    window.location.href = url;
  }
}
