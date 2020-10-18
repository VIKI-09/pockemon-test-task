import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Zoom,
  Chip,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getPokemonInfo } from "./api";

function getTypeColor(typeName) {
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
}

function replaceFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    padding: theme.spacing(3, 3, 2),
    display: "grid",
    gridTemplateColumns: "50% 50%",
  },
  cardMedia: {
    paddingTop: "80%",
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
}));

function PokeCard({ itemData, handleClick }) {
  const classes = useStyles();
  const [cardData, setCardData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPokemonInfo(itemData.url.match(/\/(\d+)/)[1]);
      setCardData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Grid item sm={4} key={itemData.name}>
      <Zoom
        in={true}
        timeout={{
          enter: 500,
          exit: 1000,
        }}
      >
        {cardData ? (
          <CardActionArea onClick={() => handleClick(cardData.id)}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                title="title"
                image={cardData.sprites.front_default}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="subtitle1" align="center">
                  {replaceFirst(cardData.name)}
                </Typography>
              </CardContent>
              <CardActions>
                {cardData.types.map((type) => {
                  return (
                    <Chip
                      style={{ backgroundColor: getTypeColor(type.type.name) }}
                      label={replaceFirst(type.type.name)}
                      small
                    />
                  );
                })}
              </CardActions>
            </Card>
          </CardActionArea>
        ) : (
          <p>Loading...</p>
        )}
      </Zoom>
    </Grid>
  );
}

export default PokeCard;
