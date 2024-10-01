import { MenuItem, UserRole } from '@/types/item';
import { navItems } from './sideBarLinks';

export function filterMenuByRole(role: UserRole): MenuItem[] {
  return navItems.reduce((acc, item) => {
    if (item.roles.includes(role)) {
      const filteredItem = { ...item };
      if (item.children) {
        filteredItem.children = item.children.filter((child) =>
          child.roles.includes(role)
        );
      }
      if (!filteredItem.children || filteredItem.children.length > 0) {
        acc.push(filteredItem);
      }
    }
    return acc;
  }, [] as MenuItem[]);
}
