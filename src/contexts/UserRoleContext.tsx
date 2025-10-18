import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import userRoles from '@src/libs/user-roles.json';
import { USER_ROLE_EDITOR } from '@src/libs/constants';

interface UserRoleContextValue {
  userRole: (typeof userRoles)[number];
  setUserRole: (role: (typeof userRoles)[number]) => void;
}

const STORAGE_KEY = 'user-role';
const DATA_ATTR = 'data-user-role';

const UserRoleContext = createContext<UserRoleContextValue | undefined>(undefined);

/**
 * @date 9/20/2025, 10:16:51 AM
 * @description User role provider component
 * @author siqbal
 * @param {ReactNode} children - child components
 * @param {string} defaultUserRole - default user role if none is set in localStorage
 * @return {JSX.Element}
 */
export function UserRoleContextProvider({
  children,
  defaultUserRole = USER_ROLE_EDITOR,
}: {
  children: ReactNode;
  defaultUserRole: (typeof userRoles)[number];
}): JSX.Element {
  const [userRole, setUserRole] = useState<(typeof userRoles)[number]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as (typeof userRoles)[number] | null;
    return saved ?? defaultUserRole;
  });

  useEffect(() => {
    document.documentElement.setAttribute(DATA_ATTR, userRole);
    localStorage.setItem(STORAGE_KEY, userRole);
  }, [userRole]);

  const contextValue = useMemo(() => ({ userRole, setUserRole }), [userRole]);

  return <UserRoleContext.Provider value={contextValue}>{children}</UserRoleContext.Provider>;
}

/**
 * @date 9/20/2025, 10:16:33 AM
 * @description Custom hook to access user role context
 * @author siqbal
 * @return {UserRoleContextValue}
 */
export function useUserRole(): UserRoleContextValue {
  const ctx = useContext(UserRoleContext);
  if (!ctx) {
    throw new Error('useUserRole must be used within a UserRoleContext');
  }
  return ctx;
}
