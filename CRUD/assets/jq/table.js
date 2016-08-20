
$(function (){
	$.post("server/table.php", function(json){
		var data = JSON.parse(json);
		var count = 0;
		for (var row in data) {
			$("#addhere").append('<tr><td class="hidden">' + data[row].key + 
					'</td><td class="number">' + ++count +
					'</td><td>' + data[row].name +
					'</td><td>' + data[row].quantity +
					'</td><td>' + data[row].price +
					'</td><td>' + data[row].price * data[row].quantity +
					'<td><i class="fa fa-minus-circle" aria-hidden="true"></i> &nbsp; ' + 
					'<i class="fa fa-pencil" aria-hidden="true"></i></td></tr>');
		}
	})
	
	$("#addhere").on('click', "i.fa-minus-circle", function () {
		if(!confirm("Are you sure?")){
			return;
		}
		var row = $(this).closest('tr');
		var key = row.find('td').eq(0).html();
		
		$.post("server/remove.php", {remove: key});
		row.remove();
		
		for(var num = 0; num < $(".number").length; num++){
			$(".number").eq(num).html(num + 1);
		}
		
	})
	
	$("#addhere").on('click', "i.fa-pencil", function () {
//		var elements = $(this).closest("tr").find('td');
//		data = {
//				key: elements.eq(0).html(),
//				name: elements.eq(2).html(),
//				quantity: elements.eq(3).html(),
//				price: elements.eq(4).html(),		
//		};
		var key = $(this).closest("tr").find('td').eq(0).html()
		$.post("server/setKeyToEdit.php", {key: key}, function(){
			window.location = "edit.html";
		});
//		setTimeout(function(){window.location = "edit.html"}, 200);
	})
})