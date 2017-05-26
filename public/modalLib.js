var modalLib = (function(){

	function showModal(data, popupWrap, template, closeSelector, cb) {
		return function(e) {
			var $popupWrap = $(popupWrap),
			popupContent = data[e.target.attributes['data-index'].value].children;
			$popupWrap.html(template);
			cb(popupContent, '#usersTbodyChildren');
			$(closeSelector).on('click', function() {
				$popupWrap.html('');
			});
		}
	}

	return {
		showModal: showModal
	}
})();