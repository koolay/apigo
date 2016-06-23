<!DOCTYPE html>
<html>
<head>
<title>登录</title>

<!-- Viewport mobile tag for sensible mobile support -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<!--STYLES-->
<link rel="stylesheet" href="/styles/importer.css">
<!--STYLES END-->
<link rel="stylesheet" href="/semantic/semantic.min.css">
  <style type="text/css">
    body {
      background-color: #DADADA;
    }
    body > .grid {
      height: 100%;
    }
    .image {
      margin-top: -100px;
    }
    .column {
      max-width: 450px;
    }
  </style>

</head>

<body>

<div class="ui middle aligned center aligned grid">
    <div class="column">
        <h2 class="ui teal image header">
            <div class="content">
                登录
            </div>
        </h2>
        <form class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="email" placeholder="E-mail address">
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="Password">
                    </div>
                </div>
                <div id="submitLogin" class="ui fluid large teal submit button">Login</div>
            </div>

            <div class="ui error message"></div>

        </form>

        <div class="ui message">
            New to us? <a href="#">Sign Up</a>
        </div>
    </div>
</div>


<!--SCRIPTS-->
<script src="/js/dependencies/sails.io.js"></script>
<script src="/js/dependencies/axios.min.js"></script>
<script src="/js/dependencies/jquery.min.js"></script>
<!--SCRIPTS END-->
<script src="/semantic/semantic.min.js"></script>


<script type="text/javascript">

  // Var to save the JWT token in memory when we have igt
  var jwtToken;

  // Simple function to transform regular links into asynchronous html loaders
  var gotoPage = function(url) {
    // Clear out any errors being displayed
    $('#errors').html('');
    // Make an AJAX GET request with an Authorization header bearing our JWT token (if any)
    $.ajax(url, {
      method: 'get',
      dataType: 'text',
      headers: {
        'Authorization': 'Bearer ' + jwtToken,
      },
      // If the request is successful, display the HTML in the content area
      success: function(html) {
        $('#content').html(html);
      },
      // Otherwise display the errors in the error area
      error: function(jqXHR) {
        $('#errors').html(jqXHR.responseText);
      }
    });
  }

  // Special handler for the "logout" link -- clear the JWT token before
  // loading the "/logout" page content
  $( document ).on( 'click', 'a[href="/logout"]', function(e) {
    jwtToken = null;
  });

  // When a link is clicked, instead of the default behavior (loading a page in the browser)
  // we'll make an AJAX request for the page content, and place that content in the #content DIV,
  // making this a simple SPA (single-page app)
  $( document ).on( 'click', 'a', function(e) {
    // Prevent the default behavior when clicking a link
    e.preventDefault();
    // Don't propagate this click to other elements on the page
    e.stopPropagation();
    // Use our gotoPage function to load the page contents
    gotoPage($(this).attr('href'));
  });

  // When the "submit" button is clicked on the login page, attempt to log in
  $( document ).on( 'click', '#submitLogin', function onSubmitLogin(e) {
    $('#errors').html('');
    e.preventDefault();
    $.ajax('/login', {
      method: 'post',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val()
      }),
      // If the login is successful, save the JWT token and load the home page
      success: function(result) {
          if (result.result) {
              console.log(result.data);
            window.location.href='/';
          } else {
              alert(result.msg);
          }
      },
      // If not, update the "errors" section on the page
      error: function(jqXHR, text) {
        $('#errors').html(jqXHR.responseText);
      }
    });
  });

</script>

<script type="text/javascript">
  // Start off by loading the home page content
  $('#content').load("/home");
</script>

</body>
</html>
