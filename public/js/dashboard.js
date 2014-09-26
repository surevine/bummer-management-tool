$(document).ready(function() {
    if ($('.user-table').find('tbody tr').length > 5) {
        $('.user-table').DataTable()
    }
    
    $('.user-table').on('click', 'i.delete-user', function(e) {
        $('#delete-user span.jid').html($(this).attr('data-jid'))
        $('#delete-user').modal('show') 
    })
})