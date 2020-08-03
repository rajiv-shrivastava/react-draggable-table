import React,{Component} from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './assets/css/style.css'

const DragHandle = sortableHandle(() => <span className="dragItem"></span>);

const SortableItem = sortableElement(({value}) => (
  <React.Fragment>
    <tr>
      <td> 
        <DragHandle /> {value}
        </td>
        <td>         
      </td>
    </tr>
  </React.Fragment>
));

const SortableContainer = sortableContainer(({children}) => {
  return <table className="table">
    <thead>
       <tr>
      <th>
        Things To Do
      </th>
      <th>
        Two
      </th>
      </tr>
    </thead>
    <tbody>
        {children}
      </tbody>
    </table>;
});

export default class TableWithDrag extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [
        {title: 'Item 1'}, 
        {title: 'Item 2'}, 
        {title: 'Item 3'}, 
        {title: 'Item 4'}, 
        {title: 'Item 5'}, 
        {title: 'Item 6'}
      ]
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({todos}) => ({
      todos: arrayMove(todos, oldIndex, newIndex),
    }));
  };

  render() {
    const {todos} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {todos.map((todo, index) => (
          <SortableItem key={`item-${todo.title}`} index={index} value={todo.title} />            
        ))}
      </SortableContainer>
    );
  }
}


