export interface SubmenuItem {
  title: string;
  url: string;
  // roles: string[];
}

export interface SidebarItem {
  id: number;
  name: string;
  iconPath: string; // Changé pour stocker seulement le path
  // roles: string[];
  submenus: SubmenuItem[];
}

export const sidebarData: SidebarItem[] = [
  {
    id: 1,
    name: 'Tableau de bord',
    iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Tableau de bord', /* roles: ['USER', 'ADMIN'], */ url: '/user/dashboard' }
    ]
  },
  {
    id: 2,
    name: 'Carte des parcelles',
    iconPath: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Carte des parcelles', /* roles: ['USER', 'ADMIN'], */ url: '/user/parcelles' }
    ]
  },
  {
    id: 2,
    name: 'diagnostic',
    iconPath: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'diagnostic IA', /* roles: ['USER', 'ADMIN'], */ url: '/user/diagnostic' }
    ]
  },
  {
    id: 3,
    name: 'Alertes',
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Alertes', /* roles: ['USER', 'ADMIN'], */ url: '/user/alertes' }
    ]
  },
  {
    id: 4,
    name: 'Suivi des rendements',
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Suivi des rendements', /* roles: ['USER', 'ADMIN'], */ url: '/user/rendements' }
    ]
  },
  {
    id: 5,
    name: 'Messages WhatsApp',
    iconPath: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Messages WhatsApp', /* roles: ['USER', 'ADMIN'], */ url: '/user/messages' }
    ]
  },
  {
    id: 6,
    name: 'Rapports',
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Rapports', /* roles: ['USER', 'ADMIN'], */ url: '/user/rapports' }
    ]
  },
  {
    id: 7,
    name: 'Paramètres',
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Paramètres', /* roles: ['USER', 'ADMIN'], */ url: '/user/parametres' }
    ]
  },
  {
    id: 8,
    name: 'Aide',
    iconPath: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    // roles: ['USER', 'ADMIN'],
    submenus: [
      { title: 'Aide', /* roles: ['USER', 'ADMIN'], */ url: '/user/aide' }
    ]
  }
];
