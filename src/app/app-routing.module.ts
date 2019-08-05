import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';


import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';



const routes: Routes = [

  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada'}

];


@NgModule({

  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled',
  malformedUriErrorHandler: (error: URIError, urlSerializer: UrlSerializer, url: string) => {
    console.log(url);
    return urlSerializer.parse('/dashboard');
  }
})
  ],
  exports: [RouterModule
  ]

})
export class AppRoutingModule { }
