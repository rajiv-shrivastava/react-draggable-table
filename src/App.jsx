import React from 'react';
import TableWithDrag from './TableWithDrag'
import Header from './Header'

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />     
        <div className="offset-1 col-10"> 
        <TableWithDrag />
        </div>
        </div>
    );
  }
}

