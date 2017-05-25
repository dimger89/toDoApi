(function() {
	'use strict';

	var $getUsersButton = $('#getUsersButton'),
		$usersTbody = $('#usersTbody'),
		usersData;

	$.get( "/api/contactlist", function( data ) {
		  usersData = data;
		  drawTable(usersData, usersTbody);
	});

	
	
	function drawTable(data, placeToAppend) {
		
		$.each(data, function(i, item) {
			var tdText = '';
			console.log(i, item);
			var checked = item.checked ? 'checked' : '';
			var popover = (item.children && item.children.length) ? ' data-toggle="popover" title="Prev data" data-content="'+ JSON.stringify(item.children) +'"' : '';
			tdText += '<td '+popover+'>'+item.name+'</td><td><input type="checkbox" '+checked+'></td>';
			var tr = document.createElement('tr');
			tr.innerHTML = tdText;

			placeToAppend.append(tr);
		});
		$('[data-toggle="popover"]').popover(); 
	}
})();
