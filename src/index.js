import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo.jsx'
import './index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <Demo />
    </DndProvider>,
    document.getElementById("root")
  );