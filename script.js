document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.getElementById('todo-list');

  // Load previous to-do list items from localStorage
  const savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
  savedItems.forEach(item => {
    const todoItem = createTodoItem(item);
    todoList.appendChild(todoItem);
  });

  addButton.addEventListener('click', function() {
    const todoText = input.value.trim();
    if (todoText !== '') {
      const todoItem = createTodoItem(todoText);
      todoList.appendChild(todoItem);
      input.value = '';

      // Save the updated to-do list to localStorage
      saveTodoItems();
    }
  });

  function createTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const li = document.createElement('li');
    li.textContent = text;
    todoItem.appendChild(li);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    todoItem.appendChild(closeButton);

    closeButton.addEventListener('click', function() {
      todoItem.classList.add('deleted');
      setTimeout(function() {
        todoItem.remove();
        saveTodoItems();
      }, 500);
    });

    return todoItem;
  }

  function saveTodoItems() {
    const todoItems = Array.from(todoList.querySelectorAll('li')).map(li => li.textContent);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }
});
