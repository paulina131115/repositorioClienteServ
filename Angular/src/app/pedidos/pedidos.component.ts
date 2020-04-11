import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  // tslint:disable: no-inferrable-types

  private static _id: string = '';
  static get id(): string {
    return PedidosComponent._id;
  }
  static set id(value: string) {
    PedidosComponent._id = value;
  }

  private static _sabor: string = '';
  static get sabor(): string {
    return PedidosComponent._sabor;
  }
  static set sabor(value: string) {
    PedidosComponent._sabor = value;
  }

  private static _descripcion: string = '';
  static get descripcion(): string {
    return PedidosComponent._descripcion;
  }
  static set descripcion(value: string) {
    PedidosComponent._descripcion = value;
  }

  private static _iq: number = null;
  static get iq(): number {
    return PedidosComponent._iq;
  }
  static set iq(value: number) {
    PedidosComponent._iq = value;
  }

  private static _imagen: string = '';
  static get imagen(): string {
    return PedidosComponent._imagen;
  }
  static set imagen(value: string) {
    PedidosComponent._imagen = value;
  }
  private static _envioType: string = '';
  static get envioType(): string {
    return PedidosComponent._envioType;
  }
  static set envioType(value: string) {
    PedidosComponent._envioType = value;
  }
  private static _quantity: number = null;
  static get quantity(): number {
    return PedidosComponent._iq;
  }
  static set quantity(value: number) {
    PedidosComponent._iq = value;
  }

  private static _trigger: boolean = false;
  static get trigger(): boolean {
    return PedidosComponent._trigger;
  }
  static set trigger(value: boolean) {
    PedidosComponent._trigger = value;
  }

  Agregar() {
    // tslint:disable-next-line: prefer-const
    let pedido = {
      sabor: PedidosComponent.sabor,
      iq: PedidosComponent.iq,
      descripcion: PedidosComponent.descripcion,
      imagen: PedidosComponent.imagen,
      envioType:PedidosComponent.envioType,
      quantity:PedidosComponent.quantity
    };
    this.pedidos.push(pedido);
  }

  Borrar(sabor: string) {
    this.pedidos = this.pedidos.filter(item => item.sabor !== sabor);
  }

  Actualizar(sabor: string, iq: number, descripcion: string, imagen: string,envioType:string,quantity:number) {
    if (PedidosComponent.iq !== null) {
      this.pedidos.find(item => item.sabor === sabor).iq = PedidosComponent.iq;
    }
    if (PedidosComponent.descripcion !== '') {
      this.pedidos.find(item => item.sabor === sabor).descripcion = PedidosComponent.descripcion;
    }
    if (PedidosComponent.imagen !== '') {
      this.pedidos.find(item => item.sabor === sabor).imagen = PedidosComponent.imagen;
    }
    if (PedidosComponent.sabor !== '') {
      this.pedidos.find(item => item.sabor === sabor).sabor = PedidosComponent.sabor;
    }
    if (PedidosComponent.envioType !== '') {
      this.pedidos.find(item => item.envioType === envioType).envioType = PedidosComponent.envioType;
    }
    if (PedidosComponent.quantity !== null) {
      this.pedidos.find(item => item.quantity === quantity).quantity = PedidosComponent.quantity;
    }
  }

  guardarID(id: string) {
    PedidosComponent.id = id;
  }
  
  guardarDatos(id: string, flavor: string, iq: number, description: string, picture: string,envioType:string,quantity:number) {
    console.log(id, flavor, iq, description, picture);
    PedidosComponent.id = id;
    PedidosComponent.sabor = flavor;
    PedidosComponent.iq = iq;
    PedidosComponent.descripcion = description;
    PedidosComponent.imagen = picture;
    PedidosComponent.envioType=envioType;
    PedidosComponent.quantity=quantity;

    PedidosComponent.trigger = true;
  }

  pedidos: any;
  constructor(private _dataService: DataService, private router: Router) { }

  redirect() {
    this.router.navigate(['login']);
}

  actualizarTabla() {
    this._dataService.pedidosObservable
    .subscribe((resultados) => {
      this.pedidos = resultados;
    });

    this._dataService.obtenerPedidos();
  }

  ngOnInit(): void {
    console.log("Actualizar tabla...");
    this.actualizarTabla();
    if(AppComponent.logged === false){
      this.redirect();
    }
  }

}
