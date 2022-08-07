import { useContext, useEffect, useReducer } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { types, initialState, reducer } from "../reducer/themesReducer";

export const getUsedTheme = (state) => {
  const theme = state.themes.filter((el) => +el.id === +state.usedTheme);
  if (theme.length) return theme[0];
  else return null;
};

export const defaultTheme = {
  text: "#5571ee",
  main: "#0057ee",
  second: "#ff99ff",
  card: "#223377",
};

function useThemes(getLocalState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const localState = getLocalState();

    dispatch({
      type: types.init,
      state: localState,
    });
  }, []);

  useEffect(() => {
    if (state.loaded) {
      localStorage.setItem("theme_state", JSON.stringify(state));
    }
  }, [state]);

  function add(theme) {
    dispatch({ type: types.add, theme });
  }

  function remove(id) {
    dispatch({ type: types.remove, id });
  }

  function select(theme) {
    setTheme(theme);
    dispatch({ type: types.select, id: theme.id });
  }

  return { state, add, remove, select };
}

export default useThemes;
