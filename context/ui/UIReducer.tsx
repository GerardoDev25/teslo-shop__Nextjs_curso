import { UIState } from './';

type UIActionType = { type: '[UI] - tootleMenu' };

export const uIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI] - tootleMenu':
      return { ...state, isMenuOpen: !state.isMenuOpen };

    default:
      return state;
  }
};
