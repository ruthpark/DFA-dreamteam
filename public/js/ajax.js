
$(document).ready(function() {

  $("#sign-up-2").click(function( event ) {
    event.preventDefault();

    // get the username
    var name = $("#sign-up-name").val();
    var pwd = $("#sign-up-pwd").val();

    // send the AJAX request
    $.ajax({
      url: '/signup',
      data: {
        username: name,
        password: pwd,
      },
      type: 'POST',
      success: function(data) {
        // update the HTML element with the returned data
        if (data.error) {
          $(".error-message").text("An account under this username already exists. Please log in or sign up under a different username");      
        } else {
        location.href = '/status'
        }
        },
      error: function(xhr, status, error) {
        console.log(error);
        }
    });
  });
  $("#sign-in-2").click(function( event ) {
      console.log("sign in clicked");
    event.preventDefault();

    // get the username
    var name = $("#sign-in-name").val();
    var pwd = $("#sign-in-pwd").val();

    // send the AJAX request
    $.ajax({
      url: '/signin',
      data: {
        username: name,
        password: pwd,
      },
      type: 'POST',
      success: function(data) {
        console.log("this is what we want from ajax");
        // update the HTML element with the returned data
        if (data.error) {
          $(".error-message2").text("The username and password do not match, please try again or sign up");      
        } else {
        location.href = '/status'
        }
        },
      error: function(xhr, status, error) {
        console.log(error);
        }
    });
  });
});
