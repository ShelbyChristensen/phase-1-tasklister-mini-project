document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const input = document.querySelector("#new-task-description");
  const prioritySelect = document.querySelector("#priority");
  const taskList = document.querySelector("#tasks");

 // Optional: Add due date input programmatically (or you can hardcode it in HTML)
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "due-date";
  dueDateInput.name = "due-date";
  dueDateInput.style.marginLeft = "10px";
  form.insertBefore(dueDateInput, form.querySelector('input[type="submit"]'));

  form.addEventListener("submit", function (event) {
    event.preventDefault(); //stop form from refreshing the page

  const task = input.value; //grab what the user typed
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;

  if (task.trim() === "") return; // optional: ignore empty submissions

  // Create list item
    const li = document.createElement("li");

  // Build task text with due date
    const taskText = `${task}${dueDate ? " (Due: " + dueDate + ")" : ""}`;
    const textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

  // Apply priority color
    if (priority === "high") {
      li.style.color = "red";
    } else if (priority === "medium") {
      li.style.color = "orange";
    } else {
      li.style.color = "green";
    }

  //Complete checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginLeft = "10px";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
      } else {
        li.style.textDecoration = "none";
        li.style.opacity = "1";
      }
    });
    
  //Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => li.remove());

  //Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.style.marginLeft = "5px";
    editBtn.addEventListener("click", () => {
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = task; // Only editable task text, not due date

    const newDueDateInput = document.createElement("input");
    newDueDateInput.type = "date";
    newDueDateInput.value = dueDate;

  // Replace existing text
    li.firstChild.replaceWith(inputField);
    li.insertBefore(newDueDateInput, deleteBtn);
    editBtn.textContent = "💾";

    editBtn.onclick = () => {
    const updatedTask = inputField.value.trim();
    const updatedDue = newDueDateInput.value;
        if (updatedTask === "") return;

    const newText = `${updatedTask}${updatedDue ? " (Due: " + updatedDue + ")" : ""}`;
    const newTextNode = document.createTextNode(newText);

    li.replaceChild(newTextNode, inputField);
    newDueDateInput.remove();
    editBtn.textContent = "EDIT";
    editBtn.onclick = arguments.callee;
      };
    });

  // Add buttons to the list item
    li.appendChild(checkbox);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

  // Append to the DOM
    taskList.appendChild(li);

  // Reset the form
    form.reset();
  });
});