import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react"; //changeEvent is usefull  for  change in event
import "./App.css";
interface Tasks {
  input: String;
}

const App = () => {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<Tasks[]>(
    JSON.parse(`${localStorage.getItem("myList")}`) || []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  //to add the item in list
  const handleAddItem = () => {
    localStorage.setItem("myList", JSON.stringify([...list, { input }]));
    setList(JSON.parse(`${localStorage.getItem("myList")}`));
    setInput("");
  };
  //to handle the delete
  const handleDeleteItem = (taskNameToDelete: String): void => {
    const newList1 = list.filter((task) => task.input !== taskNameToDelete);
    setList(newList1);
    localStorage.setItem("myList", JSON.stringify(newList1));
  };
  return (
    <Box style={{ height: "100vh", backgroundColor: "#ddd" }}>
      <Container>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          TO DO APP
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddItem();
          }}
          style={{ margin: "2% auto " }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "1% auto ",
              gap: "50px",
            }}
          >
            <TextField
              id=" input outlined-basic"
              label="Input the Task Here"
              defaultValue="Small"
              variant="outlined"
              size="small"
              type="text"
              name="input"
              value={input}
              onChange={handleChange}
            />
            <Button variant="contained" color="success" type="submit">
              Add Item
            </Button>
          </Box>
        </form>
      </Container>

      <Container
        sx={{
          margin: "10px auto",
        }}
      >
        <Grid container spacing={2}>
          {list &&
            list.map((tasks: Tasks, i: number) => {
              console.log(tasks);
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      margin: "1%",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      backgroundColor: "#333",
                      color: "#fff",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h3">{tasks.input}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteItem(tasks.input)}
                      >
                        delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
