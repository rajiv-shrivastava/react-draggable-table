import React,{Component} from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './assets/css/style.css'

const DragHandle = sortableHandle(() => <span className="dragItem"></span>);

const SortableContainer = sortableContainer(({children}) => {
  return <table className="table">
    <thead>
       <tr>
      <th>
        Things To Do
      </th>
      <th>
        Owner
      </th>
      <th>
        Status
      </th>
      <th>
        Due Date
      </th>
      <th>
        Priority
      </th>
      </tr>
    </thead>
    <tbody>
        {children}
      </tbody>
    </table>;
});

const SortableItem = sortableElement(({title,owner,status,dueDate,priority}) => (
  <React.Fragment>
    <tr>
      <td> 
        <DragHandle /> {title}
        </td>
        <td>
          {owner}         
        </td>
        <td>
          {status}         
        </td>
        <td>
          {dueDate}         
        </td>
        <td>
          {priority}         
        </td>
    </tr>
  </React.Fragment>
));

export default class TableWithDrag extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [
        {title: 'Item 1',owner: 'anonyomous',status: 'Pending',dueDate: '12.08.2020',priority: 'Urgent'}, 
        {title: 'Item 2',owner: 'anonyomous',status: 'Pending',dueDate: '12.08.2020',priority: 'Urgent'}
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
          <SortableItem 
            key={`item-${todo.title}`} 
            index={index} 
            title={todo.title} 
            owner={todo.owner}
            status={todo.status}
            dueDate={todo.dueDate}
            priority={todo.priority}
            />            
        ))}
      </SortableContainer>
    );
  }
}


