import React,{Component} from "react";

import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';

import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <span>Move</span>);

const SortableItem = sortableElement(({value}) => (
  <React.Fragment>
    <tr>
      <td> 
        {value}
        </td>
        <td>
         <DragHandle />
      </td>
    </tr>
  </React.Fragment>
));

const SortableContainer = sortableContainer(({children}) => {
  return <table className="table">
    <tbody>
        {children}
      </tbody>
    </table>;
});

export default class TableWithDrag extends Component {
  state = {
    todos: [
      'Item 1', 
      'Item 2', 
      'Item 3', 
      'Item 4', 
      'Item 5', 
      'Item 6'
    ],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({todos}) => ({
      todos: arrayMove(todos, oldIndex, newIndex),
    }));
  };

  render() {
    const {todos} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {todos.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} >             
          </SortableItem>
        ))}
      </SortableContainer>
    );
  }
}


