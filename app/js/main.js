//Variable for local storage
var data = {
  unfinished: [],
  finished: []
};

//Checks if local data exists, and if it does sets data to exisitng local data
if (localStorage.getItem('todoList')) {
  data = JSON.parse(localStorage.getItem('todoList'));
}

//SVG format for remove and finish
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="30" height="30"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var finishSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var editSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.337 490.337" style="enable-background:new 0 0 490.337 490.337;" xml:space="preserve"><rect class="noFill" width="30" height="30"/><g><g><path class="fill" d="M229.9,145.379l-47.5,47.5c-17.5,17.5-35.1,35-52.5,52.7c-4.1,4.2-7.2,9.8-8.4,15.3c-6.3,28.9-12.4,57.8-18.5,86.7l-3.4,16c-1.6,7.8,0.5,15.6,5.8,20.9c4.1,4.1,9.8,6.4,15.8,6.4c1.7,0,3.4-0.2,5.1-0.5l17.6-3.7c28-5.9,56.1-11.9,84.1-17.7c6.5-1.4,12-4.3,16.7-9c78.6-78.7,157.2-157.3,235.8-235.8c5.8-5.8,9-12.7,9.8-21.2c0.1-1.4,0-2.8-0.3-4.1c-0.5-2-0.9-4.1-1.4-6.1c-1.1-5.1-2.3-10.9-4.7-16.5l0,0c-14.7-33.6-39.1-57.6-72.5-71.1c-6.7-2.7-13.8-3.6-20-4.4l-1.7-0.2c-9-1.1-17.2,1.9-24.3,9.1C320.4,54.879,275.1,100.179,229.9,145.379z M386.4,24.679c0.2,0,0.3,0,0.5,0l1.7,0.2c5.2,0.6,10,1.2,13.8,2.8c27.2,11,47.2,30.6,59.3,58.2c1.4,3.2,2.3,7.3,3.2,11.6c0.3,1.6,0.7,3.2,1,4.8c-0.4,1.8-1.1,3-2.5,4.3c-78.7,78.5-157.3,157.2-235.9,235.8c-1.3,1.3-2.5,1.9-4.3,2.3c-28.1,5.9-56.1,11.8-84.2,17.7l-14.8,3.1l2.8-13.1c6.1-28.8,12.2-57.7,18.4-86.5c0.2-0.9,1-2.3,1.9-3.3c17.4-17.6,34.8-35.1,52.3-52.5l47.5-47.5c45.3-45.3,90.6-90.6,135.8-136C384.8,24.979,385.7,24.679,386.4,24.679z"/><path class="fill" d="M38.9,109.379h174.6c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H38.9c-21.5,0-38.9,17.5-38.9,38.9v327.4c0,21.5,17.5,38.9,38.9,38.9h327.3c21.5,0,38.9-17.5,38.9-38.9v-167.5c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v167.5c0,7.9-6.5,14.4-14.4,14.4H38.9c-7.9,0-14.4-6.5-14.4-14.4v-327.3C24.5,115.879,31,109.379,38.9,109.379z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'

//Global variable to check which edit button is hit
var editFinished;
var editUnfinished;
var editValue;

//Initalizes list on boot
renderList();

//Adds event listener to the add button
document.getElementById('addItem').addEventListener('click', buttonClick);

//Adds event listener on hitting enter button
document.getElementById('item').addEventListener('keydown', function(event) {
  if (event.keyCode == 13) {
    buttonClick();
  }
});

//Checks if text is present in task box
function buttonClick() {
  var input = document.getElementById('item').value;
  if (!data.unfinished.includes(input) && !data.finished.includes(input)) {
    //Updates finished list if current task being editted was finished
    if (editFinished) {
      //Updates task to new input
      if (input.length > 0 && input.trim().length > 0) {
        addItemToDo(input, true);
        document.getElementById('item').value = "";

        data.finished.push(input);

        updateDataObject();

        editFinished = false;
      }
      //If new input is empty, restore previous task
      else {
        addItemToDo(editValue, true);
        document.getElementById('item').value = "";

        data.finished.push(editValue);

        updateDataObject();

        editFinished = false;
        editValue = "";
      }
    }
    //Updates unfinished list if current task being editted was unfinished
    else if (editUnfinished) {
      //Updates task to new input
      if (input.length > 0 && input.trim().length > 0) {
        addItemToDo(input, false);
        document.getElementById('item').value = "";

        data.unfinished.push(input);

        updateDataObject();

        editUnfinished = false;
      }
      //If new input is empty, restore previous task
      else {
        addItemToDo(editValue, false);
        document.getElementById('item').value = "";

        data.unfinished.push(editValue);

        updateDataObject();

        editUnfinished = false;
        editValue = "";
      }
    }
    //Updates unfinished list in all other scenarios
    else {
      if (input.length > 0 && input.trim().length > 0) {
        addItemToDo(input, false);
        document.getElementById('item').value = "";

        data.unfinished.push(input);

        updateDataObject();
      }
      else {
        document.getElementById('item').value = "";
      }
    }
  }
  else {
    document.getElementById('item').value = "";
  }
}

function renderList() {
  //Skips rendering if there is no local data
  if (data.unfinished.length === 0 && data.finished.length === 0) {
    return;
  }
  //Renders list if there is existing local data
  else {
    for (var i = 0; i < data.unfinished.length; i++) {
      var value = data.unfinished[i];
      addItemToDo(value, false);
    }
    for (var j = 0; j < data.finished.length; j++) {
      var value = data.finished[j];
      addItemToDo(value, true);
    }
  }
}

//Saves JSON text to local storage
function updateDataObject() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

//Adds a new item to to do list
function addItemToDo(text, completed) {
  //Checks if the value passed in is true, and updates the corresponding list
  if (completed) {
    var list = document.getElementById('finished');
  }
  else {
    var list = document.getElementById('unfinished');
  }

  //Creates list to show each task
  var item = document.createElement('li');
  item.innerText = text;

  //Creates buttons for each task object
  var buttons = document.createElement('div');
  buttons.classList.add('taskButtons');

  //Edit button
  var edit = document.createElement('button');
  edit.classList.add('edit');
  edit.innerHTML = editSVG;

  //Add event listener to edit icon
  edit.addEventListener('click', editItem);

  //Remove button
  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  //Add event listener to remove icon
  remove.addEventListener('click', removeItem);

  //Finish button
  var finish = document.createElement('button');
  finish.classList.add('finish');
  finish.innerHTML = finishSVG;

  //Add event listener to finish icon
  finish.addEventListener('click', finishItem);

  //Adds buttons to tasks
  buttons.appendChild(edit);
  buttons.appendChild(remove);
  buttons.appendChild(finish);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

//Allows for editting of items already in list
function editItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;

  var parentID = parent.id;
  var value = item.innerText;

  document.getElementById('item').value = value;

  editValue = value;

  if (parentID === 'unfinished') {
    data.unfinished.splice(data.unfinished.indexOf(value), 1);
    editUnfinished = true;
  }
  else {
    data.finished.splice(data.finished.indexOf(value), 1);
    editFinished = true;
  }

  parent.removeChild(item);

  updateDataObject();
}

//Removes tasks from unfinished and finished sections by pushing remove button
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;

  var parentID = parent.id;
  var value = item.innerText;

  if (parentID === 'unfinished') {
    data.unfinished.splice(data.unfinished.indexOf(value), 1);
  }
  else {
    data.finished.splice(data.finished.indexOf(value), 1);
  }

  updateDataObject();

  parent.removeChild(item);
}

//Switches finished and unfinished items between sections by pushing finish button
function finishItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;

  var parentID = parent.id;
  var value = item.innerText;

  if (parentID === 'unfinished') {
    data.unfinished.splice(data.unfinished.indexOf(value), 1);
    data.finished.push(value);
  }
  else {
    data.finished.splice(data.finished.indexOf(value), 1);
    data.unfinished.push(value);
  }

  updateDataObject();

  var target;

  if (parentID === 'unfinished') {
    target = document.getElementById('finished');
  }
  else {
    target = document.getElementById('unfinished');
  }

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}
