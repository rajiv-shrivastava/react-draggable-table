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
        {title: 'Item 2',owner: 'beyond',status: 'Urgent',dueDate: '12.08.2020',priority: 'Urgent'}
      ],
      lastTodos: 
      [
        {title: 'Item 1',owner: 'anonyomous',status: 'Pending',dueDate: '12.08.2020',priority: 'Urgent'}, 
        {title: 'Item 2',owner: 'beyond',status: 'Urgent',dueDate: '12.08.2020',priority: 'Urgent'}
      ],
      searchKey: '',
      showSave: false,
      addTodoValue: {
        title: '',
        owner: '',
        status: '',
        dueDate: '',
        priority: ''
      }
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
     this.setState({todos: allTodos,showSave: true})
  }

  handleAddTodoValue = (e) => {
    let name = e.target.name
    let value = e.target.value
    let addTodoValueNew = this.state.addTodoValue
    addTodoValueNew[`${name}`] =  value
    this.setState({addTodoValue: addTodoValueNew  })
    console.log('this.state',this.state)
  }

  saveTodo = () => {
    let allTodos = this.state.todos
     allTodos = allTodos.slice(0,this.state.todos.length - 1)
     allTodos.push(this.state.addTodoValue)
     this.setState({
       todos: allTodos,
       showSave: false,
       addTodoValue: {
        title: '',
        owner: '',
        status: '',
        dueDate: '',
        priority: ''
      }})
  }

  cancelTodo = () => {
    let allTodos = this.state.todos
    allTodos = allTodos.slice(0,this.state.todos.length - 1)
     this.setState({
      todos: allTodos,
      showSave: false,
      addTodoValue: {
       title: '',
       owner: '',
       status: '',
       dueDate: '',
       priority: ''
     }})
  }

  handleSearch = () => {
   let {searchKey,todos} = this.state
   let searchArr = []
   todos.map(tod => {
          for(let key in tod){
            if(tod[key].toLowerCase().includes(searchKey)){
              searchArr.push(tod)
            }
        }
      }
     ) 
   searchArr.length > 0 ? this.setState({lastTodos: todos,todos: searchArr}) : ''
  }

  handleReset = () => {
    this.setState({
      todos: this.state.lastTodos
    })
  }



  render() {
    const {todos,showSave,addTodoValue} = this.state;

    const AddTodoForm = 
          <React.Fragment>
            <tr>
              <td> 
                <input 
                    onChange={this.handleAddTodoValue} 
                    name="title"
                    className="form-control" 
                    type="text" 
                    placeholder="things to do"/>
                </td>
                <td>
                <input 
                  onChange={this.handleAddTodoValue} 
                  name="owner"
                  className="form-control" 
                  type="text" 
                  placeholder="owner" />
                </td>
                <td>
                <select className="custom-select" name="status" defaultValue={addTodoValue['status']} onChange={this.handleAddTodoValue}>
                    <option value="">Choose status</option>
                    <option value="Pending">Pending</option>
                    <option value="Donw">Done</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </td>
                <td>
                <input 
                  onChange={this.handleAddTodoValue} 
                  name="dueDate" 
                  className="form-control" 
                  type="number" 
                  placeholder="Due Date" />
                </td>
                <td>
                  <select className="custom-select" name="priority" defaultValue={addTodoValue['priority']} onChange={this.handleAddTodoValue}>
                    <option value="">Choose priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                  </select>
                </td>
            </tr>
          </React.Fragment>


    return (
      <React.Fragment>
        
      <div className="row mb-50">
         <div className="col-sm-3"></div>
         <input type="text" placeholder="Search in Todos with any column.."  
           onChange={(e) => this.setState({searchKey: e.target.value})}
         className="form-control col-sm-4"/>
          &nbsp;
         <button className="btn btn-info btn-sm col-sm-2" onClick={this.handleSearch}>
            Search
            </button>
         &nbsp;
         <button className="btn btn-warning btn-sm col-sm-2" onClick={this.handleReset}>Reset</button>
      </div>

      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {todos.map((todo, index) => (
          todo.title == 'newTodo'  ? 
             AddTodoForm
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
      {!showSave && 
      <button className="btn btn-info btn-sm" onClick={this.addTodo}>+ Add new </button>
      }
        &nbsp;&nbsp;
      {showSave && 
        <button type="button" className="btn btn-outline-secondary btn-sm" 
          onClick={this.saveTodo}>
            Save
        </button>
       }
       &nbsp;&nbsp;
       {showSave && 
        <button type="button" className="btn btn-outline-secondary btn-sm" 
          onClick={this.cancelTodo}>
            Cancel
        </button>
       } 
      </React.Fragment>

    );
  }
}


