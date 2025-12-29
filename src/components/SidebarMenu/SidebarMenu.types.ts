export interface MenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
  }
  
  export interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
    items: MenuItem[];
    title?: string;
  }