declare module 'shared/Header' {
  const Header: React.ComponentType<any>;
  export default Header;
}

declare module 'shared/SideNav' {
  const SideNav: React.ComponentType<any>;
  export default SideNav;
}

declare module 'shared/Auth' {
  export const msalInstance: any;
  export const LoginScreen: React.ComponentType<any>;
  export const tokenRequest: any;
}

declare module 'shared/theme' {
  export const theme: any;
}

declare module 'shared/api' {
  export const queryClient: any;
  export const setUserAdGroupIds: (ids: number[]) => void;
  export const createApiClient: any;
  export const createMockApi: any;
}

declare module 'remote/Dashboard' {
  const Dashboard: React.ComponentType<any>;
  export default Dashboard;
}
