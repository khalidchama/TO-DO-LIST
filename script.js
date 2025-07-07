'use strict';
document.addEventListener('DOMContentLoaded', ()=>{
    // Assigning variables to HTML elements
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Creating a todo item
    function addTodoItem(inputText) {
        const todoItem = document.createElement('li'); // Creating <li> element
        const textSpan = document.createElement('span'); // Creating <span> element
        textSpan.textContent = inputText; // Adding text inside <span> element
        
        todoItem.appendChild(textSpan); // Adding span element containing text to <li> element, creating the to do list item
        todoList.appendChild(todoItem); // Appending <li> element to <ul> element

        // Creating item actions, like editing, deleting, save after edit and calcel editing
        // actons container div
        const itemActions = document.createElement('div');
        itemActions.classList.add('item-actions');

        // edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', ()=>{
            editItem(todoItem, textSpan);
        });
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', ()=>{
            deleteItem(todoItem);
        });

        // Append edit and delete buttons to the actions div
        itemActions.appendChild(editBtn);
        itemActions.appendChild(deleteBtn);

        // Append item actions div to the <li> element
        todoItem.appendChild(itemActions);
    }

    // Adding event listener to 'add to do' button
    todoForm.addEventListener('submit', (e)=>{
        e.preventDefault(); // Prevent form from default action which is submitting on submit button click
        const inputText = todoInput.value;
        addTodoItem(inputText);
        todoInput.value = '';
    });

    function deleteItem(todoItem) {
        todoList.removeChild(todoItem);
    }

    function editItem(todoItem, textSpan) {
        // Creating edit input field with default value same as that of textSpan element in <li> element
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.setAttribute('autocomplete', 'off'); // Here we set attribute of input field 'autocomplete' to 'off' so that no suggetions appear we user starts filling the input. The syntax for setting attribute is element.setAttribute('attribute', 'value')
        editInput.value = textSpan.textContent;
        
        // Creating new actions element that will contain 'cancel' and 'save' buttons
        const newItemActions = document.createElement('div');
        newItemActions.classList.add('new-item-actions');
        
        const cancelEdit = document.createElement('div'); // Div that will contain cancel icon from fontawesome
        cancelEdit.classList.add('cancel-edit');

        const cancelIcon = document.createElement('i'); // Adding fontawesome icon for cancel
        cancelIcon.classList.add('fa-solid');
        cancelIcon.classList.add('fa-xmark');
        cancelEdit.appendChild(cancelIcon);
        
        const saveBtn = document.createElement('button');
        saveBtn.classList.add('save-btn');
        saveBtn.textContent = 'Save';

        // Append 'cancel icon' and 'save button' to new actions div
        newItemActions.appendChild(cancelEdit);
        newItemActions.appendChild(saveBtn);

        // Replacing text span with 'edit' input filed and the item actions div containing edit and delete buttons with new item actions div containing cancel icon and save button 
        todoItem.replaceChild(editInput, textSpan);

        const originalActions = todoItem.querySelector('.item-actions'); // Since 'itemActions' was declared inside another function we cant access using its variable name here. So we use querySelector() to access it by its class name. Note that we start with its parent name 'todoItem' instead of 'document. q...' because we want our item to be found with element not in th entie document since using 'document' may select another item with same name outside our element
        todoItem.replaceChild(newItemActions, originalActions);
        editInput.focus(); // Let focus be on edit input as this directs the user

        // Adding click event handler to 'cancel' icon and 'save' button
        cancelEdit.addEventListener('click', ()=>{
            // Replace the new actions of 'cancel' and 'save' with original actions of 'edit' and 'delete' as user cancels the edit
            todoItem.replaceChild(textSpan, editInput);
            todoItem.replaceChild(originalActions, newItemActions);
        });

        // Adding click event handler to 'save' button
        saveBtn.addEventListener('click', ()=>{
            const updatedInput = editInput.value; // Assign 'updatedInput' variable to value of the edited input
            if(updatedInput) {
                textSpan.textContent = updatedInput; // Asign the text in text span to updated text input
                todoItem.replaceChild(textSpan, editInput);
                todoItem.replaceChild(originalActions, newItemActions);
            } else {
                alert('Add text in edit filed');
                editInput.focus();
            }
        });
    }
});