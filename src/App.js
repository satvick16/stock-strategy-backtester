import React, {useEffect, useState} from 'react';
import './App.css';
import {Plot} from './components/Plot'

function App() {
  const [plot, setPlot] = useState([]);

  // TODO: show loading screen during fetch

  useEffect(() => {
    fetch('/api/results', {
      headers: {
        'ticker': 'IBM',
        'short': 50,
        'long': 200,
        'qty': 50,
        'start_date': '2015-09-09',
        'end_date': '2021-09-01'
      }
    }).then(res => 
      res.json()).then(data => {
        setPlot(data);
    })
  }, [plot])

  return (
    <div className="App">
      <Plot plot={plot} />
    </div>
  );
}

export default App;
