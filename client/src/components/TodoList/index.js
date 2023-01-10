import TodoItem from '../TodoItem';

const TodoList = props => {
  return (
    <ul>
      {props.todos.map(task => (
        <TodoItem key={task._id} item={task} />
      ))}
    </ul>
  );
};

export default TodoList;
