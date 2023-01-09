const TodoList = props => {
  return (
    <ul>
      {props.todos.map(task => (
        <li>{task}</li>
      ))}
    </ul>
  );
};

export default TodoList;
