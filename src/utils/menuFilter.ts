import { NavItem } from "../types";

// Define menu access by role
const menuAccess = {
  Admin: ["beranda", "master", "manajemen", "mahasiswa", "rekap"],
  Dosen: ["beranda", "manajemen", "mahasiswa", "rekap"],
  Mahasiswa: ["beranda", "mahasiswa", "rekap"],
};

// Define submenu access by role
const submenuAccess = {
  Admin: [
    "manajemen-pengguna", "manajemen-role", "master-dosen", "master-mahasiswa", "master-prodi", "master-fakultas", "jenis-pkm", "kriteria-pkm", "master-periode", // Master submenu
    "manajemen-pembimbing", "manajemen-proposal", "review-proposal", // Manajemen submenu
    "pengajuan-proposal", "rekap-mhs", // Mahasiswa submenu
    "rekap-proposal", "rekap-kip" // Rekap submenu
  ],
  Dosen: [
    "manajemen-pembimbing", "manajemen-proposal", "review-proposal", // Manajemen submenu
    "pengajuan-proposal", "rekap-mhs", // Mahasiswa submenu
    "rekap-proposal", "rekap-kip" // Rekap submenu
  ],
  Mahasiswa: [
    "pengajuan-proposal", "rekap-mhs", // Mahasiswa submenu
    "rekap-proposal", "rekap-kip" // Rekap submenu
  ],
};

// Filter menu items based on user role
export const filterMenuByRole = (
  menuItems: NavItem[],
  userRole?: string
): NavItem[] => {
  // If no role or Admin, return all menus
  if (!userRole || userRole === "Admin") {
    return menuItems;
  }

  const allowedMenuIds = menuAccess[userRole as keyof typeof menuAccess];
  const allowedSubmenuIds = submenuAccess[userRole as keyof typeof submenuAccess];

  if (!allowedMenuIds) {
    return [];
  }

  // Filter top-level menu items
  const filteredMenus = menuItems
    .filter((item) => allowedMenuIds.includes(item.id))
    .map((item) => {
      // If item has children, filter them using submenu access
      if (item.children && item.children.length > 0) {
        const filteredChildren = item.children.filter((child) =>
          allowedSubmenuIds.includes(child.id)
        );

        // Only return item with children if it has visible children
        return {
          ...item,
          children: filteredChildren,
        };
      }
      return item;
    })
    .filter(item => {
      // Keep items without children or items with visible children
      return !item.children || (item.children && item.children.length > 0);
    });

  return filteredMenus;
};

// Check if user has access to specific menu
export const hasMenuAccess = (menuId: string, userRole?: string): boolean => {
  if (!userRole || userRole === "Admin") {
    return true;
  }

  // Check main menu access
  const allowedMenuIds = menuAccess[userRole as keyof typeof menuAccess];
  if (allowedMenuIds && allowedMenuIds.includes(menuId)) {
    return true;
  }

  // Check submenu access
  const allowedSubmenuIds = submenuAccess[userRole as keyof typeof submenuAccess];
  return allowedSubmenuIds ? allowedSubmenuIds.includes(menuId) : false;
};
