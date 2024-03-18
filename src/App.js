import React from 'react';
import ImageDetection from './ImageDetection';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Pug or Not Pug?</h1>
      <ImageDetection />
    </div>
  );
};

export default App;