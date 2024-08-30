import { useState } from 'react'
import './App.css'
import { Todo } from './components/todo'
import TodoTask from './components/todo-task';
function App()  {
  // definitions
  const [todoCount, setTodoCount] = useState(0);
  const [todoList, setTodoList] = useState<Array<Todo>>([]);
  const [index, setIndex] = useState(0);
  const createTodo = (description: string) => {
    if(description){
      const newTodo: Todo = {id:index,description: description, completed: false};
      setIndex(index + 1);
      setTodoList((prevTodo) => [...prevTodo, newTodo]);
      setTodoCount(c => c+1);

    }
  }
  // remove the id from array
  const deleteTodo = (todo: Todo) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter( elem => elem.id !== todo.id);
    });

    if(!todo.completed){
      setTodoCount(todoCount-1);
    }
  }
// is it checked or unchecked
  const updateCount = (todo: Todo) => {
    setTodoCount(todoCount + (todo.completed ? -1 : 1));
  }
// remove all that are not completed
  const clearCompleted = () => {
    setTodoList((prevTodo) => {
      return prevTodo.filter( todo => !todo.completed);
    });
  }
  return (
    <>
      <h1>{todoCount > 0 ? todoCount : null} TO-DO{todoCount > 1 ? 'S' : null}</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        let nextTodo = e.currentTarget.todo.value;
        // reset the value
        e.currentTarget.todo.value = null;
         createTodo(nextTodo);
      }}>
        <input placeholder="new task" type="text" id="todo" name="todo"></input>
        <button type="button" onClick={clearCompleted}>Clear completed</button>
      </form>
      <ul >
        {todoList.map( (todo) => 
          (<TodoTask
              key={todo.id}
              todo={todo}
              removeTodo={deleteTodo}
              countTodo={updateCount}
            />)
        )}
      </ul>
    </>
  )
}


export default App
