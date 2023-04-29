// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentSettings = {};
dayjs.locale(currentSettings);

$(function () {
  //grabs the current hour using day.js
  const currentTIme = dayjs().format('H');
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //saves the user inputs into local storage when clicking the save button
  function userInput() {
    $('.saveBtn').on('click', function () {
      const elementOne = $(this).parent().attr('id');
      const elementTwo = $(this).siblings('.description').val();
      localStorage.setItem(elementOne, elementTwo);
    })
  }
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  //function to change color of the timeblock
  function blockColor() {
    //sets target to the class time-block
    $('.time-block').each(function() {
      //parse the id from the time blocks into the variable
      const rowHour = parseInt(this.id);
      //toggle class to add/remove class names to the targeted 
      $(this).toggleClass('past', rowHour < currentTIme);
      $(this).toggleClass('present', rowHour === currentTIme);
      $(this).toggleClass('future', rowHour > currentTIme);
    })
  }

  //changes color depending on time
  function changeColor() {
    $('.time-block').each(function() {
      const rowHour = parseInt(this.id);
      if (rowHour === currentTIme) {
        $(this).removeClass('past future').addClass('present');
      } else if (rowHour > currentTIme) {
        $(this).removeClass('past present').addClass('future');
      } else {
        $(this).removeClass('present future').addClass('past')
      }
    })
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  //sets the saved data from local storage into the block
  $('.time-block').each(function() {
    const elementOne = $(this).attr('id');
    const elementTwo = localStorage.getItem(elementOne);
    $(this).children('.description').val(elementTwo);
  });

  // TODO: Add code to display the current date in the header of the page.
  //took this code from the 05-stu-28-mini-project
  var timeDisplayEl = $('#time-display')
  function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss A');
    timeDisplayEl.text(rightNow);
  }
  
  displayTime();
  setInterval(displayTime, 1000);

  blockColor();
  changeColor();
  userInput();
  
});
