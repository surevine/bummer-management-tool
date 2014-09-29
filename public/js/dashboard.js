$(document).ready(function() {
    if ($('.user-table').find('tbody tr').length > 5) {
        $('.user-table').DataTable()
    }
    
    $('.user-table').on('click', 'i.delete-user', function(e) {
        $('#delete-user span.jid').html($(this).attr('data-jid'))
        $('#delete-user').modal('show') 
    })
    
    var endSession = function(e) {
        var jid = $(this).attr('data-jid')
        $('#end-session strong.jid').html(jid)
        var multi = null
        if (-1 === jid.indexOf('/')) {
            multi = 's for'
        } else {
            multi = ''
        }
        $('#end-session span.multi').html(multi)
        $('#end-session').modal('show') 
    }
    
    $('.user-table').on('click', 'i.end-user-session', endSession)
    $('button.end-session').click(endSession)
    
    $('#end-session button.end-session-submit').click(function() {
        document.location.href = '/user/end-session/' + $('#end-session strong.jid').html()
    })
})