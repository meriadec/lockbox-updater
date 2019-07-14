import color from "color";

export default {
  bg: "hsl(220, 48%, 14%)",
  fg: "hsl(0, 0%, 80%)",
  blue: "#0c6cf2",
  lightBlue: "#649eed",
  orange: "#f47b13",
  green: "#37aa5a",
  error: "hsla(351, 47%, 46%, 1)",
  errorBg: "hsla(351, 47%, 46%, 0.3)",
  errorFg: "hsla(351, 83%, 70%, 1)",
  warning: "#ffac22",
};

export function opacity(c, op) {
  return color(c)
    .alpha(op)
    .string();
}

export function darken(c, n) {
  return color(c)
    .darken(n)
    .string();
}

export function lighten(c, n) {
  return color(c)
    .lighten(n)
    .string();
}
