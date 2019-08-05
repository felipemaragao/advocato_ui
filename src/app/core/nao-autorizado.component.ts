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
  <link rel="stylesheet" type="text/css" href="../../assets/layout/css/layout-dark.css">
</head>

<body class="exception-body">
  <div class="exception-panel">
      <img src="../../assets/layout/images/icon-access.png" alt="access" />

      <h1>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esse recurso</p>
      <button type="button"  [routerLink]="['/dashboard']"
      class="ui-button black-btn ui-widget ui-state-default ui-corner-all rounded-btn">
          <span class="ui-button-text ui-c" style="padding:5px;"> IR AO  DASHBOARD </span>
      </button>
  </div>
</body>

  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
