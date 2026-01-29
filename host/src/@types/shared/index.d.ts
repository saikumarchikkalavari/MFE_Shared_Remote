declare module 'shared/Header' {
  import { FC } from 'react';
  interface HeaderProps {
    title?: string;
    onSearchChange?: (_value: string) => void;
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
    notificationCount?: number;
    userAvatar?: string;
    userName?: string;
    drawerWidth?: number;
  }
  const Header: FC<HeaderProps>;
  export default Header;
}

declare module 'shared/SideNav' {
  import { FC, ReactNode } from 'react';
  
  interface NavItem {
    id?: string;
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
    children?: NavItem[];
  }
  
  interface SideNavProps {
    navItems: NavItem[];
    title?: string;
    width?: number;
    currentPath?: string;
  }
  
  const SideNav: FC<SideNavProps>;
  export default SideNav;
}

declare module 'shared/DataTable' {
  import { FC } from 'react';
  import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
  
  export interface DataTableProps<TData = any> {
    rowData: TData[];
    columnDefs: ColDef<TData>[];
    pagination?: boolean;
    paginationPageSize?: number;
    rowSelection?: 'singleRow' | 'multiRow';
    onSelectionChanged?: (selectedRows: TData[]) => void;
    onGridReady?: (api: GridApi) => void;
    defaultColDef?: ColDef;
    height?: string;
    animateRows?: boolean;
    gridOptions?: GridOptions;
  }
  
  const DataTable: FC<DataTableProps>;
  export default DataTable;
}

declare module 'shared/Button' {
  import { FC } from 'react';
  import { ButtonProps as MuiButtonProps } from '@mui/material';
  
  export interface ButtonProps extends MuiButtonProps {
    label?: string;
  }
  
  const Button: FC<ButtonProps>;
  export default Button;
}

declare module 'shared/theme' {
  import { Theme } from '@mui/material/styles';
  export const theme: Theme;
  export const fontTokens: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '4xl': string;
  };
  export const fontWeights: {
    light: number;
    normal: number;
    bold: number;
  };
  export const brandColors: Record<string, string>;
}

declare module 'shared/api' {
  import { AxiosInstance } from 'axios';
  import { QueryClient } from '@tanstack/react-query';
  
  export const apiClient: AxiosInstance;
  export const queryClient: QueryClient;
}

declare module 'shared/types' {
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
  }
  
  export interface Order {
    id: string;
    customerId: string;
    products: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
  }
  
  export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
  }
}

declare module 'shared/Auth' {
  import { FC } from 'react';
  import { Configuration, PopupRequest, PublicClientApplication } from '@azure/msal-browser';
  
  export const msalConfig: Configuration;
  export const loginRequest: PopupRequest;
  export const tokenRequest: { scopes: string[] };
  export const msalInstance: PublicClientApplication;
  export const initializeMsal: () => Promise<void>;
  
  interface LoginScreenProps {
    title?: string;
    subtitle?: string;
  }
  
  const LoginScreen: FC<LoginScreenProps>;
  export default LoginScreen;
}

declare module 'shared/DateSelector' {
  import { FC } from 'react';
  
  interface DateSelectorProps {
    value: Date | null;
    onChange: (value: Date | null) => void;
    format?: string;
    width?: number;
    size?: "small" | "medium";
    placeholder?: string;
    disabled?: boolean;
    disablePast?: boolean;
    minDate?: Date;
    maxDate?: Date;
  }
  
  const DateSelector: FC<DateSelectorProps>;
  export default DateSelector;
}

declare module 'shared/AppState' {
  import { FC, ReactNode } from 'react';
  
  // Type definitions
  export interface UserProfile {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
    localAccountId?: string;
    tenantId?: string;
    ad_group_ids?: string[];
    [key: string]: any;
  }

  export interface UserPreferences {
    language?: string;
    timezone?: string;
    dateFormat?: string;
    theme?: "light" | "dark" | "auto";
    notifications?: {
      email: boolean;
      browser: boolean;
      desktop: boolean;
    };
    [key: string]: any;
  }

  export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    timestamp: Date;
    actionUrl?: string;
    metadata?: Record<string, any>;
  }

  export interface ThemeConfig {
    mode: "light" | "dark";
    customColors?: Record<string, string>;
    typography?: {
      fontFamily?: string;
      fontSize?: number;
    };
    spacing?: number;
    borderRadius?: number;
  }

  export interface AppSettings {
    autoSave?: boolean;
    defaultPageSize?: number;
    compactMode?: boolean;
    showTutorials?: boolean;
    [key: string]: any;
  }

  export interface AppState {
    user?: {
      profile?: UserProfile;
      permissions?: string[];
      preferences?: UserPreferences;
    };
    theme?: ThemeConfig;
    notifications?: {
      unreadCount: number;
      items: NotificationItem[];
    };
    settings?: AppSettings;
    navigation?: {
      currentPath?: string;
      breadcrumbs?: Array<{ label: string; path: string }>;
      sideNavCollapsed?: boolean;
    };
    [key: string]: any;
  }

  export interface AppStateContextValue {
    state: AppState;
    updateAppState: <T>(key: keyof AppState, data: T) => void;
    getAppData: <T>(key: keyof AppState) => T | undefined;
    clearAppData: (key?: keyof AppState) => void;
    hasAppData: (key: keyof AppState) => boolean;
  }

  // Provider component
  interface AppStateProviderProps {
    children: ReactNode;
    initialState?: Partial<AppState>;
  }
  
  export const AppStateProvider: FC<AppStateProviderProps>;
  export const useAppState: () => AppStateContextValue;
  
  // Typed hooks
  export interface SharedUserHook {
    userProfile?: UserProfile;
    userPermissions?: string[];
    userPreferences?: UserPreferences;
    updateUserProfile: (profile: UserProfile) => void;
    updateUserPermissions: (permissions: string[]) => void;
    updateUserPreferences: (preferences: UserPreferences) => void;
    hasPermission: (permission: string) => boolean;
    isLoggedIn: boolean;
  }

  export interface SharedThemeHook {
    themeMode: "light" | "dark";
    customColors?: Record<string, string>;
    typography?: { fontFamily?: string; fontSize?: number };
    setThemeMode: (mode: "light" | "dark") => void;
    setCustomColors: (colors: Record<string, string>) => void;
    toggleTheme: () => void;
  }

  export interface SharedNotificationsHook {
    notifications: NotificationItem[];
    unreadCount: number;
    addNotification: (notification: Omit<NotificationItem, "id" | "timestamp">) => void;
    markAsRead: (notificationId: string) => void;
    markAllAsRead: () => void;
    removeNotification: (notificationId: string) => void;
    clearAllNotifications: () => void;
  }

  export interface SharedSettingsHook {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    resetSettings: () => void;
    getSetting: <T>(key: string, defaultValue?: T) => T;
  }
  
  export const useSharedUser: () => SharedUserHook;
  export const useSharedTheme: () => SharedThemeHook;
  export const useSharedNotifications: () => SharedNotificationsHook;
  export const useSharedSettings: () => SharedSettingsHook;
  export const useSharedNavigation: () => any;
  export const useSharedPermissions: () => any;
  export const createSharedDataHook: <T>(domain: string) => () => any;
  export const useSharedFeatureFlags: () => any;
}
