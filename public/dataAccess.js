var dataAccess = (function(){
        function load(url, cb) {
                $.get(url, function( data ) {
                        cb(data);
                });
        }

        function save(url, data, cb) {
                $.post({
                        url: url,
                        data: data,
                        success: (res) => {
                                cb(res);
                        }
                })
        }

        function remove(url, cb) {
             $.ajax({
                     method: 'DELETE',
                     url: url,
                     success: (res) => {
                             cb(res);
                     }
             });
        }
    
        function update(url, data, cb) {
             $.ajax({
                     method: 'PUT',
                     url: url,
                     data: data,
                     success: (res) => {
                             cb(res);
                     }
             });
        }

        return {
                load: load,
                save: save,
                remove: remove,
                update: update
        }

})();