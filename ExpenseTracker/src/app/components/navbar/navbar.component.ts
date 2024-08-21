import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;


  constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            { label: 'Movimenti', icon: 'pi pi-euro', route: '/transactions' },
            {
                label: 'Estratto conto',
                icon: 'pi pi-chart-line',
                route: '/statement'
            },
            { label: 'Dashboard', icon: 'pi pi-sliders-v', route: '/dashboard'}
        ];
    }

}
