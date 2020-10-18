import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { replaceFirst } from "./utils";

function Details({ data }) {
  return (
    <Card
      style={{
        position: "sticky",
        top: "5%",
        overflow: "inherit",
      }}
    >
      <Container style={{ padding: "10%" }}>
        <CardMedia
          style={{ paddingTop: "80%" }}
          title={data.name}
          image={data.image}
        />
      </Container>
      <CardContent>
        <Typography variant="h4" align="center">
          {replaceFirst(data.name)}
        </Typography>

        <Table>
          <TableBody>
            {data ? (
              data.table.map((row) => (
                <TableRow>
                  <TableCell component="th" scope="row" key={row.property}>
                    {replaceFirst(row.property)}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Details;
