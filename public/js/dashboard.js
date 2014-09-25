$(document).ready(function() {
    if ($('.user-table').find('tbody tr').length > 5) {
        $('.user-table').DataTable()
    }
    
    $('.user-table').bind('click', 'i.delete-user', function(e) {
        $('#delete-user span.jid').html($(e.target).attr('data-jid'))
        $('#delete-user').modal('show') 
    })
})