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
  CircularProgress,
  LinearProgress,
  Backdrop,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Details from "./Details";
import PokeCard from "./PokeCard";
import { getPokemonList, getPokemonInfo } from "./api";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4, 0, 2),
    color: theme.palette.common.white,
  },
  cardContainer: {
    padding: theme.spacing(3, 3, 2),
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
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await getPokemonList();

      setListData(result.data);
      setLoading(false);
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
        {isLoading ? <LinearProgress /> : null}
        <Container className={classes.cardContainer} maxWidth="lg">
          <Grid container direction="row" maxWidth={"lg"} spacing={3}>
            <Grid container item xs={12} sm={6} spacing={7}>
              {listData ? (
                <>
                  {listData.results.map((item) => {
                    return (
                      <PokeCard handleClick={onCardClick} itemData={item} />
                    );
                  })}
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
                </>
              ) : null}
            </Grid>
            <Grid
              item
              style={{
                //   gridColumnStart: 2,
                //   gridColumnEnd: 3,
                padding: "0 10% 0%",
              }}
              xs={12}
              sm={6}
              md={6}
              lg={6}
            >
              {detailsCard ? <Details data={detailsCard} /> : null}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default App;

// return (
//     <>
//       {/*<AppBar position="fixed">*/}
//       {/*  <Container fixed>*/}
//       {/*    <Toolbar>*/}
//       {/*      <Typography className={classes.title} variant="h6">*/}
//       {/*        Pokedex*/}
//       {/*      </Typography>*/}
//       {/*    </Toolbar>*/}
//       {/*  </Container>*/}
//       {/*</AppBar>*/}
//       <main>
//         <div className={classes.title}>
//           <Container maxWidth="sm">
//             <Typography component="h1" variant="h1" align="center" gutterBottom>
//               Pokedex
//             </Typography>
//           </Container>
//         </div>
//         <Container className={classes.cardContainer} maxWidth="lg">
//           <Grid container spacing={7}>
//             {listData ? (
//                 listData.results.map((item) => {
//                   return <PokeCard handleClick={onCardClick} itemData={item} />;
//                 })
//             ) : (
//                 <div> Loading...</div>
//             )}
//             <Grid item xs={12}>
//               <Button
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   onClick={loadMoreHandler}
//               >
//                 Load More
//               </Button>
//             </Grid>
//           </Grid>
//           <Grid
//               style={{
//                 gridColumnStart: 2,
//                 gridColumnEnd: 3,
//                 padding: "20% ",
//               }}
//               sm={6}
//           >
//             {detailsCard ? <Details data={detailsCard} /> : null}
//           </Grid>
//         </Container>
//       </main>
//     </>
// );
// }
