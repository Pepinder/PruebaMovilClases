import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string = "";
  contrasena:string = "";

  constructor(private router:Router,private helper:HelperService) { }

  ngOnInit() {
    console.log("El resultado de la suma es: ",this.helper.sumar(10,1));
    
  }

  registro(){
    this.router.navigateByUrl("registro");
  }

  onLogin(){
/*     console.log("Usuario",this.usuario);
    console.log("Contraseña",this.contrasena); */


    if (this.usuario == "") {
      //alert("Debe ingresar un usuario");
      this.helper.showAlert("Debe ingresar un usuario","Error");
      return;
    }
    if (this.contrasena == "") {
      alert("Debe ingresar una contraseña");
      return;
    }

    if (this.usuario == "admin" && this.contrasena == "123") {
      //alert("Login correcto");
      this.router.navigateByUrl('menu');
    }else{
      alert("Usuario o contraseña incorrecta.")
    }

    
    
  }



}
