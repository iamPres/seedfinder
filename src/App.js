import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from "@material-ui/core"
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Background from "./Background";
function App() {

  const [seed, setSeed] = useState(0)
  const [distance, setDistance] = useState(0)
  const [loading, setLoading] = useState(true)
  querySeed();

  function querySeed() {
    let target = "https://a18exmb9f3.execute-api.us-east-2.amazonaws.com/prod/SFHandler/stronghold";
    let proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`;
    fetch(proxy)
      .then(res => res.json())
      .then(
        (result) => {
          result = JSON.parse(result.contents)
          setSeed(result.seed);
          setDistance(result.distance);
          setLoading(false);
          console.log(result)
        },
        (error) => {
          console.log("Error: " + error);
        }
      )
  }

  const theme = createMuiTheme();

  theme.typography.h1 = {
    fontSize: '15rem',
  };

  theme.typography.h2 = {
    fontSize: '5rem',
  };

  theme.typography.h3 = {
    fontSize: '3rem',
    color: "#666666"
  };

  theme.typography.h4 = {
    fontSize: '2rem',
    color: "grey"
  };


  function renderContent() {
    if (loading) {
      return (<Box mt={-5}><h1>Loading...</h1></Box>);
    } else {
      return (
        <Box display="flex" flexDirection="column" style={{ width: "50%", height: "50%" }}>
          <Box mt={-10} />
          <Paper style={{ width: "100%", height: "100%", backgroundColor: "#bababa" }}>
            <Box mt={2.5}/>
            <Typography variant="h3">Nearest Stronghold</Typography>
            <Box mb={3} />
            <Paper style={{ width: "100%", height: "100%" }}>
              <Box display="flex" flexDirection="column" style={{ width: "100%", height: "100%", alignItems: "left", justifyContent: "left" }}>
                <Typography variant="h1">{Math.round(distance)}</Typography>
                <Box mt={-3} />
                <Typography variant="h4">blocks from spawn at seed</Typography>
                <Box mt={1} />
                <Typography variant="h2">{seed}</Typography>
              </Box>
            </Paper>
          </Paper>
        </Box>
      );
    }
  }

  return (
    <div style={{ position: "fixed", width: "100%", height: "100%" }}>
      <ThemeProvider theme={theme}>
        <Background />
        <Box display="flex" className="App" style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
          {renderContent()}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
