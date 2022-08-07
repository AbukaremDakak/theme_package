export const types = {
  add: "ADD",
  remove: "REMOVE",
  select: "SELECT",
  init: "INIT",
};

export const initialState = {
  loaded: false,
  usedTheme: null,
  themes: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.add:
      return {
        ...state,
        themes: [...state.themes, action.theme],
      };

    case types.remove:
      return {
        ...state,
        usedTheme: state.usedTheme === action.id ? null : state.usedTheme,
        themes: [...state.themes.filter((e) => e.id !== action.id)],
      };

    case types.select:
      return { ...state, usedTheme: action.id };

    case types.init:
      return {
        ...initialState,
        ...action.state,
        loaded: true,
      };

    default:
      return state;
  }
};
