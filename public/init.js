(function(dataAccess, config, modalLib) {
        'use strict';

        var $getUsersButton = $('#getUsersButton'),
                $usersTbody = '#usersTbody',
                usersData = [],
                $myModalSelector,
                arrayOfButtons = [],
                $inputField = $('#inputField'),
                bump = document.getElementById('bump');

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

        dataAccess.load(config.api.getContactListUrl, processLoadingUsersData);

        function processLoadingUsersData(data) {
                usersData = data;
                drawTable(usersData, usersTbody);
        }

        function drawTable(data, placeToAppend) {
                $.each(data, function(i, item) {
                        var $modalButton,
                        tdText = '',
                        checked = item.checked ? 'checked' : '',
                        popup = (item.children && item.children.length) ? ' <button type="button" class="btn btn-info" data-index="'+i+'" popup-button>Open Modal</button>' : '',
                        tr = document.createElement('tr');

                        tdText += '<td>'+item.name+popup+'</td><td><input type="checkbox" '+checked+'></td>';
                        tr.innerHTML = tdText;

                        $(placeToAppend).append(tr);
                        arrayOfButtons.push('[data-index="'+i+'"]');
                });

                arrayOfButtons.forEach((item) => {
                        $(item).on('click', modalLib.showModal(usersData, '#popupWrap', reloadPopupData(), '[data-dismiss=modal]', drawTable));
                })

        }

        //$inputField.on('keyup', playKeyUp);
    //
        //function playKeyUp() {
        //      bump.play();
        //}


})(dataAccess, config, modalLib);