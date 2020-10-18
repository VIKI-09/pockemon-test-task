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
function replaceFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function Details({ data }) {
  return (
    <Card
      style={{
        position: "sticky",
        top: "5%",
        overflow: "inherit",
      }}
    >
      <Container style={{ padding: "10px" }}>
        <CardMedia
          style={{ paddingTop: "60%" }}
          title="title"
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
              <p>Loading...</p>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Details;
