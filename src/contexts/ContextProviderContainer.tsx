import { ReactChildrenProps } from '@src/props/ReactChildrenProps';
import { NoteContextProvider } from './NoteContext';
import { ThemeContextProvider } from './ThemeContext';
import { UserRoleContextProvider } from './UserRoleContext';

function ContextProviderContainer({ children }: ReactChildrenProps): JSX.Element {
  return (
    <div className="context-provider-container">
      <ThemeContextProvider>
        <UserRoleContextProvider>
          <NoteContextProvider>{children}</NoteContextProvider>
        </UserRoleContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default ContextProviderContainer;
