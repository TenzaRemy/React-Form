import React from 'react';
import ReactDOM from 'react-dom/client';
import Error from './components/Error';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import GlobalStyle from './utils/style/GlobalStyle';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; // React router v6 app

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="*" element={<Error/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

