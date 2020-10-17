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
} from "@material-ui/core";

const rows = [
  { property: "#property", value: "#points" },
  { property: "#property", value: "#points" },
  { property: "#property", value: "#points" },
  { property: "#property", value: "#points" },
];
function Details() {
  return (
    <Card
      style={{
        position: "sticky",
        top: "5%",
        overflow: "inherit",
      }}
    >
      {" "}
      <Container style={{ padding: "10px" }}>
        <CardMedia
          style={{ paddingTop: "60%" }}
          title="title"
          image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        />
      </Container>
      <CardContent>
        <Typography>#NAME</Typography>

        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row" key={row.property}>
                  {row.property}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Details;
