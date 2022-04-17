import React, {useEffect, useRef} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {Button, Form,Input, Row } from 'antd';
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import FormComponent from "./components/Form/Form";
function App() {
  return (
    <div className="container">
        <div className={"header"}>
            Video App
        </div>
       <VideoPlayer/>
      <FormComponent/>

    </div>
  );
}

export default App;
