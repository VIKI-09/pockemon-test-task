import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Zoom,
  Chip,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getPokemonInfo } from "./api";
import { getTypeColor, replaceFirst } from "./utils";

const useStyles = makeStyles((theme) => ({
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
    <Grid item xs={12} sm={6} md={4} lg={4} key={itemData.name}>
      <Zoom
        in={true}
        timeout={{
          enter: 500,
          exit: 1000,
        }}
      >
        {cardData ? (
          <CardActionArea onClick={() => handleClick(cardData.id)}>
            <Card>
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
          <CircularProgress />
        )}
      </Zoom>
    </Grid>
  );
}

export default PokeCard;
