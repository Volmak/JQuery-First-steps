$(function (){
	$('#login').on('submit', function(e){
		$.ajax({
			  type: "POST",
			  url: 'server/accounts.php',
			  data: {
				  username: $('#username').val(),
				  password: $('#password').val()
			  },
			  success: function(data){
				  if (data == 'All set and ready to go') {
					  window.location = 'table.html'
				  } else {
					  $("#error").html(data);
				  };
			  },
			});
		e.preventDefault;
	});
	
	$("#forgot").on("click", function(){
		window.location = "forgotten.html";
	})
});