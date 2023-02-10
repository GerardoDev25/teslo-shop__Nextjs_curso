import { useReducer } from 'react';
import { UIContext, uIReducer } from './';

export interface UIState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
};

interface Props {
  children: React.ReactNode;
}

export const UIProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uIReducer, UI_INITIAL_STATE);

  const tootleSideMenu = () => {
    dispatch({ type: '[UI] - tootleMenu' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // methods
        tootleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
