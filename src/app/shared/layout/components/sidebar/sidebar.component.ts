import { Component, EventEmitter, Output, OnInit } from '@angular/core';
// import { AuthService } from '../../../../feature/auth/services/auth.service'; // Commenté pour l'instant
import { SidebarItem, sidebarData } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isExpanded = true;
  mobileMenuOpen = false;
  // userRole: string | null = null; // Commenté pour l'instant
  sidebarData: SidebarItem[] = sidebarData;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
    // private authService: AuthService // Commenté pour l'instant
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 1024) {
      this.isExpanded = false;
    }

    // this.userRole = this.authService.getUserRole(); // Commenté pour l'instant
  }

  // get filteredSidebarData(): SidebarItem[] {
  //   return this.sidebarData.filter(item => this.hasAccess(item.roles));
  // } // Commenté pour l'instant

  // hasAccess(allowedRoles: string[]): boolean {
  //   if (!this.userRole) return false;
  //   return allowedRoles.includes(this.userRole);
  // } // Commenté pour l'instant

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarToggled.emit(this.isExpanded);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isDesktop(): boolean {
    return window.innerWidth >= 1024;
  }
}
