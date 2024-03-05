import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  navLinks: any[] = [];
  // Sidenav toggle flag
  isSidenavOpen:boolean = false;

  constructor(
    private router: Router,
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this._jantekService.getPunchConfiguration();
    this.getFunctionKeyLabels();
  }

  getFunctionKeyLabels() {
    this.navLinks = [
      { path: '/punch-screen', label: 'Punch Screen' },
      { path: '/function-key-1', label: this._jantekService.punchConfiguration.fk1.caption },
      { path: '/function-key-2', label: this._jantekService.punchConfiguration.fk2.caption },
      { path: '/function-key-3', label: this._jantekService.punchConfiguration.fk3.caption },
      { path: '/function-key-4', label: this._jantekService.punchConfiguration.fk4.caption },
      { path: '/function-key-5', label: this._jantekService.punchConfiguration.fk5.caption },
      { path: '/function-key-6', label: this._jantekService.punchConfiguration.fk6.caption }
    ];
  }

  closeSideNav() {
    this.isSidenavOpen = false;
  }
  /** Toggle the Sidenav */
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  /** Navigate to the specified route and close the Sidenav */
  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeSideNav();
  }

  /** HostListener to update the flag on window resize */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.closeSideNav();
  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 720) {
        return true;
    } else {
        return false;
    }
  }

  logoff() {
    this._jantekService.logoff();
    this.router.navigate(['/login']);
  }
}
