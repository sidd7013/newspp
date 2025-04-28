import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () =>{

  const [progress,setProgress]=useState(0);

  const pageSize=10;
  const apikey = process.env.REACT_APP_NEWS_API;


    return (
      <Router>
        <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
        
      />
        <NavBar />
        <div>
          <Routes>

            <Route path="/" element={<News setProgress={setProgress} apikey={apikey}  key="general" pageSize={pageSize} country="us" category="general" />} />
            <Route path="/business" element={<News setProgress={setProgress}  apikey={apikey} key="business" pageSize={pageSize} country="us" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey}  key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={setProgress} apikey={apikey}  key="general" pageSize={pageSize} country="us" category="general" />} />
            <Route path="/health" element={<News setProgress={setProgress} apikey={apikey}  key="health" pageSize={pageSize} country="us" category="health" />} />
            <Route path="/science" element={<News setProgress={setProgress}  apikey={apikey} key="science" pageSize={pageSize} country="us" category="science" />} />
            <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey}  key="sports" pageSize={pageSize} country="us" category="sports" />} />
            <Route path="/technology" element={<News setProgress={setProgress}  apikey={apikey} key="technology" pageSize={pageSize} country="us" category="technology" />} />


          </Routes >
        </div >
      </Router >

    )
  
}

export default App;

