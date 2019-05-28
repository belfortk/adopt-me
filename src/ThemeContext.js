import { createContext } from "react";

// uses this hook function if there is no provider above it
// this should never happen
// really just shows the structure of param
const ThemeContext = createContext(["dodgerblue", () => {}]);

export default ThemeContext;
