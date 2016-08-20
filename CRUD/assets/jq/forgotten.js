$(function (){
	$('form').on('submit', function(e){
		$.ajax({
			  type: "POST",
			  url: 'server/accounts.php',
			  data: {
				  username: $('#username').val(),
				  email: $('#email').val()
			  },
			  success: function(data){
				  $("#error").html(data);
			  },
			});
		e.preventDefault;
	});
});