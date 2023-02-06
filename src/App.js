import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import { Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress});
  }
  api = 'a4c81365f47a4acfa43ae2bb89d95745';


  render() {
    
    return (
      <div>
        <LoadingBar
        color='#0d6efd'
        progress={this.state.progress}
        
      />
        <Navbar />
        <Routes>
          <Route path="/"  element={<News apikey={this.api} setProgress={this.setProgress} key='general' category="general" pageSize={9} />} />
          <Route
            path="/business" 
            element={<News apikey={this.api} setProgress={this.setProgress} key='business' category="business" pageSize={9} />}
          />
          <Route
            path="/entertainment" 
            element={<News apikey={this.api} setProgress={this.setProgress}  key='entertainment' category="entertainment" pageSize={9} />}
          />
          <Route
            path="/general" 
            element={<News apikey={this.api} setProgress={this.setProgress} key='general' category="general" pageSize={9} />}
          />
          <Route
            path="/health" 
            element={<News apikey={this.api} setProgress={this.setProgress} key='health' category="health" pageSize={9} />}
          />
          <Route
            path="/science" 
            element={<News apikey={this.api} setProgress={this.setProgress} key='science' category="science" pageSize={9} />}
          />
          <Route
            path="/sports" 
            element={<News apikey={this.api} setProgress={this.setProgress} key='sports' category="sports" pageSize={9} />}
          />
          <Route  
            path="/technology" 
            element={<News apikey={this.api} setProgress={this.setProgress} key='technology' category="technology" pageSize={9} />}
          />
        </Routes>
      </div>
    );
  }
}
