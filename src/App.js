import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react';
import News from './components/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<News key="general" category="general"></News>}></Route>
          <Route exact path="/entertainment" element={<News category="entertainment" key="entertainment"></News>}></Route>
          <Route exact path="/health" element={<News category="health" key="health"></News>}></Route>
          <Route exact path="/science" element={<News category="science" key="science"></News>}></Route>
          <Route exact path="/sports" element={<News category="sports" key="sports"></News>}></Route>
          <Route exact path="/technology" element={<News category="technology" key="technology"></News>}></Route>
          <Route exact path="/business" element={<News category="business" key="business"></News>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

