import { Component, OnInit } from '@angular/core';


@Component({
  template: `
  <head>
  <script>document.write('<base href="' + document.location + '" />');</script>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <title>Advocato - Error</title>

  <link rel="stylesheet" type="text/css" href="../../assets/theme/theme-green.css">
  <link rel="stylesheet" type="text/css" href="../../assets/layout/css/layout-dark.css"></head>

<body class="exception-body">
  <div class="exception-panel">
      <img src="../../assets/layout/images/icon-404.png" alt="404" />

      <h1>Página não encontrada</h1>
      <p>A página que você tentou acessar não foi encontrada.</p>
      <button type="button" [routerLink]="['/dashboard']"
      class="ui-button black-btn ui-widget ui-state-default ui-corner-all rounded-btn">
          <span class="ui-button-text ui-c" style="padding:5px;"> IR AO TO DASHBOARD </span>
      </button>
  </div>
</body>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent {
}
