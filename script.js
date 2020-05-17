var todoCreateForm = document.querySelector(".todo__form")
var todoEditModal = document.querySelector('.todo__edit')
var todoList = document.querySelector('.todo__list')
var editInput = document.querySelector('.todo__edit .edit-input-todo')
var hiddenInput = document.querySelector('.edit-input-id')
var editConfirmButton = document.querySelector('.edit__buttons .btn-edit')
var cancelButton = document.querySelector('.edit__buttons .btn-delete')

var todos = []
function generateRandomId () {
  return Date.now().toString()
}

function createTodo(event) {
  // Prevent the default action
  event.preventDefault()
  // Generate a random Id
  var id = generateRandomId()
  // Get the details from the form
  var todo = event.target.todo.value

  if (todo === "") {
    return alert('Please enter a valid value')
  }
  // Enclose it in a object
  var todoObject = {
    id: id,
    todo: todo
  }
  // Add it in the array
  todos.push(todoObject)

  // Create a new element and inject it to the HTML document
  var todoListItem = document.createElement('li')
  var todoSpan = document.createElement('span')
  var buttonsWrapper = document.createElement('div')
  var editButton = document.createElement('button')
  var deleteButton = document.createElement('button')

  todoSpan.innerText = todo
  editButton.innerText = 'Edit'
  deleteButton.innerText = "Delete"

  todoListItem.classList.add('todo__item')
  buttonsWrapper.classList.add('todo__buttons')
  editButton.classList.add('btn', 'btn-edit')
  deleteButton.classList.add('btn', 'btn-delete')

  // Adding event listeners
  editButton.addEventListener('click', function () {
    todoEditModal.style.display = "flex"
    hiddenInput.value = id
    editInput.value = todoList.querySelector('li[data-id="' + id + '"]').querySelector('span').innerText
  })

  deleteButton.addEventListener('click', function (event) {
    var todoListItem = event.target.parentElement.parentElement
    var todoId = todoListItem.dataset.id
    var todoIndex = todos.findIndex(function (todo) { return todo.id === todoId })
    todos.splice(todoIndex, 1)
    todoListItem.remove()
  })

  buttonsWrapper.appendChild(editButton)
  buttonsWrapper.appendChild(deleteButton)

  todoListItem.appendChild(todoSpan)
  todoListItem.appendChild(buttonsWrapper)

  todoListItem.dataset.id = id

  todoList.appendChild(todoListItem)

  event.target.todo.value = ""
}



todoCreateForm.addEventListener("submit", createTodo)

editConfirmButton.addEventListener('click', function (event) {
  var parentEditContainer = event.target.parentElement.parentElement
  var todoId = parentEditContainer.querySelector('.edit-input-id').value
  // Find the element which you are editing inside the array and change that
  var todoIndex = todos.findIndex(function (todo) { return todo.id === todoId })
  todos[todoIndex].todo = editInput.value
  // Change the UI by changing the span tag.
  var todoListItem = todoList.querySelector('li[data-id="' + todoId + '"]')
  var todoSpan = todoListItem.querySelector('span')
  todoSpan.innerText = editInput.value
  todoEditModal.style.display = "none"
})

cancelButton.addEventListener('click', function () {
  todoEditModal.style.display = "none"
})