import { createContext } from 'react';

export interface ContextProps {
  isMenuOpen: boolean;

  // methods
  tootleSideMenu: () => void
}

export const UIContext = createContext({} as ContextProps);
