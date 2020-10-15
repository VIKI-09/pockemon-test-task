import React from "react";
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
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(7, 0, 2),
    color: theme.palette.common.white,
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
  cardMedia: {
    paddingTop: "80%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const cards = [1, 2, 3, 4, 5, 6];
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
        <Container className={classes.cardContainer} maxWidth="md">
          <Grid container spacing={5}>
            {cards.map((card) => {
              return (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      title="title"
                      image="https://vignette.wikia.nocookie.net/sonicpokemon/images/7/77/Pikachu.png/revision/latest?cb=20200831092023"
                    />
                    <CardContent className={classes.cardContent}>
                      content
                    </CardContent>
                    <CardActions>
                      <Button>Button</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default App;
