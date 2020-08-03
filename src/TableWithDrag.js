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

const AddTodoForm = sortableElement(({title,owner,status,dueDate,priority}) => (
  <React.Fragment>
    <tr>
      <td> 
         <input type="text" placeholder="things to do"/>
        </td>
        <td>
        <input type="text" placeholder="owner" />
        </td>
        <td>
        <input type="text" placeholder="status" />
        </td>
        <td>
        <input type="text" placeholder="Due Date" />
        </td>
        <td>
        <input type="text" placeholder="Priority" />
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

  addTodo = () => {
    let allTodos = this.state.todos
     allTodos.push({title: 'newTodo'})
     this.setState({todos: allTodos})
  }

  saveTodo = () => {
    let allTodos = this.state.todos
     allTodos = allTodos.slice(0,this.state.todos.length - 1)
     allTodos.push({title: 'Item 20',owner: 'anonyomous',status: 'Pending',dueDate: '12.08.2020',priority: 'Urgent'})
     this.setState({todos: allTodos})
  }

  render() {
    const {todos} = this.state;

    return (
      <React.Fragment>
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {todos.map((todo, index) => (
          todo.title == 'newTodo'  ? 
            <AddTodoForm />
             :
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
      <button className="btn btn-info btn-sm" onClick={this.addTodo}>+ Add new </button>
        &nbsp;
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.saveTodo}>Save</button> 
      </React.Fragment>

    );
  }
}


