import React, { useState, useEffect, useCallback } from "react";
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
import { getPokemonList, getPokemonInfo } from "./api";

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
  const [detailsCard, setDetailsCard] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPokemonList();

      setListData(result.data);
    };
    fetchData();
  }, []);

  function createTableData(data) {
    const result = {
      table: [],
      name: null,
      image: null,
    };
    data.stats.map((item) => {
      result.table.push({ property: item.stat.name, value: item.base_stat });
    });
    result.table.push({ property: "weight", value: data.weight });
    result.image = data.sprites.front_default;
    result.name = data.name;
    return result;
  }

  const onCardClick = useCallback(async (id) => {
    const result = await getPokemonInfo(id);
    console.log(result.data);
    setDetailsCard(createTableData(result.data));
  }, []);
  const loadMoreHandler = useCallback(async () => {
    const result = await getPokemonList(listData.next);
    console.log(result);
    setListData((prevState) => {
      const newState = result.data;

      newState.results = prevState.results.concat(newState.results);
      return newState;
    });
  }, [listData]);
  const classes = useStyles();

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
                return <PokeCard handleClick={onCardClick} itemData={item} />;
              })
            ) : (
              <div> Loading...</div>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={loadMoreHandler}
              >
                Load More
              </Button>
            </Grid>
          </Grid>
          <Grid
            style={{ gridColumnStart: 2, gridColumnEnd: 3, padding: "20%" }}
          >
            {detailsCard ? <Details data={detailsCard} /> : null}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default App;
