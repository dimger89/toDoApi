(function() {
	'use strict';

	var $getUsersButton = $('#getUsersButton'),
		dataUsers,
		$usersTbody = '#usersTbody',
		$body = $('body'),
		usersData = [],
		popupContent = 'jaga-jaga',
		$myModal,
		$popupWrap = $('#popupWrap'),
		$myModalSelector;
		// popupString = `<div class="modal fade in" id="myModal" style="display: block;">
		//     <div class="modal-dialog">
		//       <div class="modal-content">
		//         <div class="modal-header">
		//           <button type="button" class="close" data-dismiss="modal">&times;</button>
		//           <h4 class="modal-title">Modal Header</h4>
		//         </div>
		//         <div class="modal-body">
		//           ${popupContent}
		//         </div>
		//         <div class="modal-footer">
		//           <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		//         </div>
		//       </div>
		//     </div>
		// </div>`;

	$.get( "/api/contactlist", function( data ) {
		  usersData = data;
		  drawTable(usersData, usersTbody);
	});

	var arrayOfButtons = [];

	function drawTable(data, placeToAppend) {
		console.log(usersData);
		$.each(data, function(i, item) {
			var $modalButton,
			tdText = '';
			// console.log(i, item);
			var checked = item.checked ? 'checked' : '';
			var popup = (item.children && item.children.length) ? ' <button type="button" class="btn btn-info" data-index="'+i+'" popup-button>Open Modal</button>' : '';
			tdText += '<td>'+item.name+popup+'</td><td><input type="checkbox" '+checked+'></td>';
			var tr = document.createElement('tr');
			tr.innerHTML = tdText;

			$(placeToAppend).append(tr);
			// $modalButton = $();
			arrayOfButtons.push('[data-index="'+i+'"]');
			// $modalButton.on('click', showModal);
		});

		arrayOfButtons.forEach((item) => {
			$(item).on('click', showModal);
		})
		
	}
	
	
	function showModal(e) {
		console.log(e.target.attributes['data-index'].value, usersData);
		popupContent = usersData[e.target.attributes['data-index'].value].children;
		$popupWrap.html(reloadPopupData());
		drawTable(popupContent, '#usersTbodyChildren')
		$('[data-dismiss=modal]').on('click', function() {
			$popupWrap.html('');
		});
	}

	
	function reloadPopupData() {
		return `<div class="modal fade in" id="myModal" style="display: block;">
		    <div class="modal-dialog">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal">&times;</button>
		          <h4 class="modal-title">Modal Header</h4>
		        </div>
		        <div class="modal-body">
		        <table class="table">
					<tbody id="usersTbodyChildren"></tbody>
				</table>
		          
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        </div>
		      </div>
		    </div>
		</div>`;
	}


})();
