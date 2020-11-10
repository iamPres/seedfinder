import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [seed, setSeed] = useState(0)
  const [distance, setDistance] = useState(0)
  const [loading, setLoading] = useState(true)

  querySeed();

  function querySeed() {
    let proxy = "https://cors-anywhere.herokuapp.com/";
    let target = "https://a18exmb9f3.execute-api.us-east-2.amazonaws.com/prod/SFHandler/stronghold";
    fetch(proxy + target)
      .then(res => res.json())
      .then(
        (result) => {
          setSeed(result.seed);
          setDistance(result.distance);
          setLoading(false);
        },
        (error) => {
          console.log("Error: " + error);
        }
      )
  }

  function renderContent() {
    if (loading) {
      return (<h1>Loading...</h1>);
    } else {
      return (
        <>
          <h2>{"Seed with nearest stronghold: " + seed}</h2>
          <h2>{Math.round(distance) + " blocks away from spawn"}</h2>
        </>
      );
    }
  }

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
