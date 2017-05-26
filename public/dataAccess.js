var dataAccess = (function(){
	function load(url, cb) {
		$.get(url, function( data ) {
			cb(data);
		});
	}

	return {
		load: load
	}
})();