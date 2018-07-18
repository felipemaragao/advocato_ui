import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../seguranca/auth.service';



@Component({
  selector: 'app-processos-grid',
  templateUrl: './processos-grid.component.html',
  styleUrls: ['./processos-grid.component.css']
})
export class ProcessosGridComponent  {

   @Input() processos = [];


   constructor(private auth: AuthService) {
  }


}
