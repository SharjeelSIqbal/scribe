import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import userRoles from '@src/libs/user-roles.json';
import { NoteType } from '@shared/types/types';
import errorHandler from 'src/service-layer/ErrorHandlingService';

interface NoteContextValue {
  note: NoteType | null;
  setNote: (note: NoteType | null) => void;
}

const NOTE_CONTEXT_NAME = 'NoteContext';

const NoteContext = createContext<NoteContextValue | undefined>(undefined);

/**
 * @date 9/20/2025, 10:16:51 AM
 * @description User role provider component
 * @author siqbal
 * @param {ReactNode} children - child components
 * @return {JSX.Element}
 */
export function NoteContextComponent({ children }: { children: ReactNode }): JSX.Element {
  const [note, setNote] = useState<NoteType | null>(null);

  const contextValue = useMemo(() => ({ note, setNote }), [note]);

  return <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>;
}

/**
 * @date 9/20/2025, 10:16:33 AM
 * @description Custom hook to access user role context
 * @author siqbal
 * @return {NoteContextValue}
 */

export function useNoteContext(): NoteContextValue | null {
  const context = useContext(NoteContext);
  if (!context) {
    errorHandler.logError(
      new Error('useNoteContext must be used within a NoteContextProvider'),
      NOTE_CONTEXT_NAME
    );
    errorHandler.createFriendlyErrorMessage(`Context not found for NoteContext`);
    return null;
  }
  return context;
}
