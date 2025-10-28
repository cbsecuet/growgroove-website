export const tabs = [
  { id: 'about', label: 'SERVICES', number: '01', theme: 'orange' },
  { id: 'agenda', label: 'PACKAGES', number: '02', theme: 'purple' },
  { id: 'tickets', label: 'CONTACT', number: '03', theme: 'blue' }
] as const;

export type TabTheme = 'orange' | 'purple' | 'blue';
export type TabId = 'about' | 'agenda' | 'tickets';

