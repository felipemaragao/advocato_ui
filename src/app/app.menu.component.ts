import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem, ScrollPanel} from 'primeng/primeng';
import {AppComponent} from './app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, AfterViewInit {

  @Input() reset: boolean;

  model: any[];

  @ViewChild('layoutMenuScroller', {static: true}) layoutMenuScrollerViewChild: ScrollPanel;

  constructor(public app: AppComponent) {}

  ngOnInit() {
      this.model = [
          {label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/']},
          {
              label: 'Menu', icon: 'fa fa-fw fa-bars', badge: 4, badgeStyleClass: 'green-badge',
              items: [
                  {label: 'Horizontal', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'horizontal' },
                  {label: 'Static', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'static' },
                  {label: 'Overlay', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'overlay' },
                  {label: 'Popup', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'popup' }
              ]
          },
          {
              label: 'Layout Colors', icon: 'fa fa-fw fa-magic',
              items: [
                  {
                      label: 'Flat',
                      icon: 'fa fa-fw fa-circle',
                      badge: 7, badgeStyleClass: 'blue-badge',
                      items: [
                          {label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                            command: (event) => {this.changeLayout('dark'); }},
                          {label: 'Turquoise', icon: 'fa fa-fw fa-paint-brush',
                            command: (event) => {this.changeLayout('turquoise'); }},
                          {label: 'Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('green'); }},
                          {label: 'Blue', icon: 'fa fa-fw fa-paint-brush',
                            command: (event) => {this.changeLayout('blue'); }},
                          {label: 'Rose', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('rose'); }},
                          {label: 'Teal', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('teal'); }},
                          {label: 'Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                            command: (event) => {this.changeLayout('bluegrey'); }}
                      ]
                  },
                  {
                      label: 'Special',
                      icon: 'fa fa-fw fa-fire',
                      badge: 8, badgeStyleClass: 'blue-badge',
                      items: [
                          {label: 'Cosmic', icon: 'fa fa-fw fa-paint-brush',
                            command: (event) => {this.changeLayout('cosmic'); }},
                          {label: 'Lawrencium', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('lawrencium'); }},
                          {label: 'Couple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('couple'); }},
                          {label: 'Stellar', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('stellar'); }},
                          {label: 'Beach', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('beach'); }},
                          {label: 'Flow', icon: 'fa fa-fw fa-paint-brush',
                            command: (event) => {this.changeLayout('flow'); }},
                          {label: 'Fly', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('fly'); }},
                          {label: 'Nepal', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('nepal'); }}
                      ]
                  }
              ]
          },
          {
              label: 'Menu Hierarchy', icon: 'fa fa-fw fa-gg',
              items: [
                  {
                      label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
                      items: [
                          {
                              label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                              items: [
                                  {label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in'},
                                  {label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in'},
                                  {label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in'},
                              ]
                          },
                          {
                              label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                              items: [
                                  {label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in'},
                                  {label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in'}
                              ]
                          },
                      ]
                  },
                  {
                      label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
                      items: [
                          {
                              label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                              items: [
                                  {label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in'},
                                  {label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in'},
                                  {label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in'},
                              ]
                          },
                          {
                              label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                              items: [
                                  {label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in'},
                                  {label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in'}
                              ]
                          },
                      ]
                  }
              ]
          },
          {
            label: 'Tabela', icon: 'fa fa-fw fa-book',
            items: [
              {label: 'Comarca', icon: 'fa fa-fw fa-gear', routerLink: ['/comarcas']},
              {label: 'Competência', icon: 'fa fa-fw fa-gear', routerLink: ['/competencias']},
              {label: 'Vara', icon: 'fa fa-fw fa-gear', routerLink: ['/varas']},
              {label: 'Localização', icon: 'fa fa-fw fa-gear', routerLink: ['/localizacoes']},
              {label: 'Tipo de Andamento', icon: 'fa fa-fw fa-gear', routerLink: ['/tiposAndamento']},
              {label: 'Tipo de Ação', icon: 'fa fa-fw fa-gear', routerLink: ['/tiposAcao']},
              {label: 'Fase do Processo', icon: 'fa fa-fw fa-wrench', routerLink: ['/fasesProcesso']},
              {label: 'Status Escritório', icon: 'fa fa-fw fa-wrench', routerLink: ['/statusEscritorios']},
              {label: 'Litigantes', icon: 'fa fa-fw fa-wrench', routerLink: ['/litigantes']},
              {label: 'Advogados', icon: 'fa fa-fw fa-wrench', routerLink: ['/advogados']},
              {label: 'Estados', icon: 'fa fa-fw fa-wrench', routerLink: ['/estados']},
              {label: 'Ocupações', icon: 'fa fa-fw fa-wrench', routerLink: ['/ocupacoes']},
              {label: 'Escritórios', icon: 'fa fa-fw fa-wrench', routerLink: ['/escritorios']},
              {label: 'Usuários', icon: 'fa fa-fw fa-wrench', routerLink: ['/usuarios']}
            ]
        },

          {
            label: 'Gerenciamento', icon: 'fa fa-fw fa-book',
            items: [
                {label: 'Pessoas', icon: 'fa fa-fw fa-gear', routerLink: ['/pessoas']},
                {label: 'Processo', icon: 'fa fa-fw fa-wrench', routerLink: ['/processos']}
            ]
        },
        {
          label: 'Relatórios', icon: 'fa fa-fw fa-book',
          items: [
              {label: 'Processo', icon: 'fa fa-fw fa-gear', routerLink: ['/relatorios/processos']},
              {label: 'Andamento', icon: 'fa fa-fw fa-wrench', routerLink: ['/relatorios/andamentos']},
              {label: 'Agenda do Advogado', icon: 'fa fa-fw fa-wrench', routerLink: ['/relatorios/agendaAdvogado']}
          ]
      }
      ];
  }

  ngAfterViewInit() {
      setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 100);
  }

  changeTheme(theme) {
      const themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
      themeLink.href = 'assets/theme/theme-' + theme + '.css';
  }
  changeLayout(layout) {
      const layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
      layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
  }

  onMenuClick() {
      if (!this.app.isHorizontal()) {
          setTimeout(() => {
              this.layoutMenuScrollerViewChild.moveBar();
          }, 450);
      }

      this.app.onMenuClick();
  }
}

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-submenu]',
  /* tslint:enable:component-selector */
  template: `
      <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
          <li [ngClass]="{'active-menuitem': isActive(i)}">
              <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
                 [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target" (mouseenter)="onMouseEnter(i)">
                  <i [ngClass]="child.icon"></i>
                  <span>{{child.label}}</span>
                  <i class="fa fa-fw fa-angle-down layout-submenu-toggler" *ngIf="child.items"></i>
                  <span class="menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{child.badge}}</span>
              </a>

              <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                  [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                  [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                  (mouseenter)="onMouseEnter(i)">
                  <i [ngClass]="child.icon"></i>
                  <span>{{child.label}}</span>
                  <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                  <span class="menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{child.badge}}</span>
              </a>
              <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                  [@children]="isActive(i) ? 'visible' : 'hidden'"></ul>
          </li>
      </ng-template>
  `,
  animations: [
      trigger('children', [
          state('visible', style({
              height: '*'
          })),
          state('hidden', style({
              height: '0px'
          })),
          transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
          transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
      ])
  ]
})
export class AppSubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _reset: boolean;

  _parentActive: boolean;

  activeIndex: number;

  hover: boolean;

  constructor(public app: AppComponent, public router: Router, public location: Location, public appMenu: AppMenuComponent) {}

  itemClick(event: Event, item: MenuItem, index: number) {
      if (this.root) {
          this.app.menuHoverActive = !this.app.menuHoverActive;
      }

      // avoid processing disabled items
      if (item.disabled) {
          event.preventDefault();
          return true;
      }

      // activate current item and deactivate active sibling if any
      if (item.routerLink || item.items || item.command || item.url) {
          this.activeIndex = (this.activeIndex === index) ? null : index;
      }

      // execute command
      if (item.command) {
          item.command({originalEvent: event, item: item});
      }

      // prevent hash change
      if (item.items || (!item.url && !item.routerLink)) {
          setTimeout(() => {
              this.appMenu.layoutMenuScrollerViewChild.moveBar();
          }, 450);
          event.preventDefault();
      }

      // hide menu
      if (!item.items) {
          if (this.app.menuMode === 'horizontal') {
            this.app.resetMenu = true;
          } else {
            this.app.resetMenu = false;
          }
          if (this.app.isMobile() || this.app.menuMode === 'overlay' || this.app.menuMode === 'popup') {
              this.app.menuActive = false;
          }

          this.app.menuHoverActive = false;
      }
  }

  onMouseEnter(index: number) {
      if (this.root && this.app.menuHoverActive && this.app.isHorizontal()
          && !this.app.isMobile() && !this.app.isTablet()) {
          this.activeIndex = index;
      }
  }

  isActive(index: number): boolean {
      return this.activeIndex === index;
  }

  @Input() get reset(): boolean {
      return this._reset;
  }

  set reset(val: boolean) {
      this._reset = val;

      if (this._reset && (this.app.menuMode === 'horizontal')) {
          this.activeIndex = null;
      }
  }

  @Input() get parentActive(): boolean {
      return this._parentActive;
  }

  set parentActive(val: boolean) {
      this._parentActive = val;

      if (!this._parentActive) {
          this.activeIndex = null;
      }
  }
}
