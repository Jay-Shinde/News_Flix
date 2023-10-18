import "./App.css";
import { useState } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import { Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const [progress, setProgress] = useState(0)
  
  // setProgress = (progress) => {
  //   this.setState({ progress: progress });
  // }
  const api = process.env.React_APP_NEWS_API;




  return (
    <div>
      <LoadingBar
        color='#0d6efd'
        progress={progress}

      />
      <Navbar />
      <Routes>
        <Route path="/" element={<News apikey={api} setProgress={setProgress} key='general' category="general" pageSize={9} />} />
        <Route
          path="/business"
          element={<News apikey={api} setProgress={setProgress} key='business' category="business" pageSize={9} />}
        />
        <Route
          path="/entertainment"
          element={<News apikey={api} setProgress={setProgress} key='entertainment' category="entertainment" pageSize={9} />}
        />
        <Route
          path="/general"
          element={<News apikey={api} setProgress={setProgress} key='general' category="general" pageSize={9} />}
        />
        <Route
          path="/health"
          element={<News apikey={api} setProgress={setProgress} key='health' category="health" pageSize={9} />}
        />
        <Route
          path="/science"
          element={<News apikey={api} setProgress={setProgress} key='science' category="science" pageSize={9} />}
        />
        <Route
          path="/sports"
          element={<News apikey={api} setProgress={setProgress} key='sports' category="sports" pageSize={9} />}
        />
        <Route
          path="/technology"
          element={<News apikey={api} setProgress={setProgress} key='technology' category="technology" pageSize={9} />}
        />
      </Routes>
    </div>
  );

}
export default App;
