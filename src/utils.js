export const getTypeColor = (typeName) => {
  switch (typeName) {
    case "normal":
      return "#19d3da";
    case "fighting":
      return "#7c3c21";
    case "flying":
      return "#b2ebf2";
    case "poison":
      return "#5c2a9d";
    case "ground":
      return "#7d5a5a";
    case "rock":
      return "#b49c73";
    case "bug":
      return "#8ccbbe";
    case "ghost":
      return "#89c9b8";
    case "steel":
      return "#8d93ab";
    case "fire":
      return "#bb2205";
    case "water":
      return "#51adcf";
    case "grass":
      return "#81b214";
    case "electric":
      return "#fddb3a";
    case "psychic":
      return "#c62a88";
    case "ice":
      return "#00bcd4";
    case "dragon":
      return "#f6830f";
    case "dark":
      return "#000000";
    case "fairy":
      return "#ffbcbc";
    case "unknown":
      return "#5e6f64";
    case "shadow":
      return "#363636";
    default:
  }
};

export const replaceFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
