import { createContext } from 'react';

export interface ContextPropsUI {
  isMenuOpen: boolean;

  // methods
  tootleSideMenu: () => void
}

export const UIContext = createContext({} as ContextPropsUI);
