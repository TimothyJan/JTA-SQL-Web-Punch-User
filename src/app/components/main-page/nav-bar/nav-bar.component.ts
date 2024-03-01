import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  navLinks = [
    { path: '/punch-screen', label: 'Punch Screen' },
    { path: '/function-key-1', label: 'Function Key 1' },
    { path: '/function-key-2', label: 'Function Key 2' },
    { path: '/function-key-3', label: 'Function Key 3' },
    { path: '/function-key-4', label: 'Function Key 4' },
    { path: '/function-key-5', label: 'Function Key 5' },
    { path: '/function-key-6', label: 'Function Key 6' }
  ];
  // Sidenav toggle flag
  isSidenavOpen:boolean = false;

  constructor(
    private router: Router,
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this._jantekService.getPunchConfiguration();
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
