import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Zoom,
  CardActionArea,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Details from "./components/Details";
import PokeCard from "./PokeCard";
import { getPokemonList } from "./api";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(7, 0, 2),
    color: theme.palette.common.white,
  },
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
  },
}));

function App() {
  const [listData, setListData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPokemonList();
      console.log(result);
      setListData(result.data);
    };
    fetchData();
  }, []);

  const classes = useStyles();
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <>
      {/*<AppBar position="fixed">*/}
      {/*  <Container fixed>*/}
      {/*    <Toolbar>*/}
      {/*      <Typography className={classes.title} variant="h6">*/}
      {/*        Pokedex*/}
      {/*      </Typography>*/}
      {/*    </Toolbar>*/}
      {/*  </Container>*/}
      {/*</AppBar>*/}
      <main>
        <div className={classes.title}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h1" align="center" gutterBottom>
              Pokedex
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardContainer} maxWidth="lg">
          <Grid container spacing={7}>
            {listData ? (
              listData.results.map((item) => {
                return <PokeCard itemData={item} />;
              })
            ) : (
              <div> Loading...</div>
            )}
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary">
                Load More
              </Button>
            </Grid>
          </Grid>
          <Grid
            style={{ gridColumnStart: 2, gridColumnEnd: 3, padding: "20%" }}
          >
            <Details />
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default App;
