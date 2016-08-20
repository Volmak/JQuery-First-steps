/**
 * 
 */

//var session = $('#sess_var').value;
$(function (){
	$.post("server/isEdit.php", function (resp) {
		if(resp){
			var data = JSON.parse(resp);
			$('input').eq(0).val(data.key);
			$('input').eq(1).val(data.name);
			$('input').eq(2).val(data.quantity);
			$('input').eq(3).val(data.price);
		}
	})
	
	$('form').on('submit', function(e){
		e.preventDefault;
		if(!($('input').eq(1).val() && $('input').eq(2).val() && $('input').eq(3).val())) {
			$("#error").html('All fields are mandatory!');
			return;
		}
		if(isNaN($('input').eq(2).val()) || isNaN($('input').eq(3).val())) {
			$("#error").html('Quantity and price inputs have to be numeric');
			return;
		}
		
		var editKey = $('input').eq(0).val() ? $('input').eq(0).val() : '';
		
		var input = {
				key: editKey,
				name: $('input').eq(1).val(), 
				quantity: $('input').eq(2).val(),
				price: $('input').eq(3).val()
		}

		$.ajax({
			type: "POST",
			url: 'server/edit.php',
			data: input,
			success: function (error) {
				if (error){
					$("#error").html(error);
				} else{
					window.location = 'table.html';
				}
			}
		});
		
	});
});