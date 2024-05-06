import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './iniSesion.component.html',
  styleUrls: ['./iniSesion.component.scss'],
})
export class IniSesionComponent implements OnInit {

  constructor(private router: Router) { }


  public redirectTo(url: String) {
    this.router.navigate([url]);
  }

  ngOnInit() { }

  registrarse(){
    console.log("mostrar Registrar")
  }
}
