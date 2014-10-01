$(document).ready(function() {
    if ($('.user-table').find('tbody tr').length > 5) {
        $('.user-table').DataTable()
    }
    
    var setupToDeleteUser = function(e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        var jid = $(this).attr('data-jid')
        $('#delete-user span.jid').html(jid)
        $('#delete-user a').attr('href', '/user/delete/' + jid)
        $('#delete-user').modal('show') 
    }
    
    $('.user-table').on('click', 'i.delete-user', setupToDeleteUser)
    
    $('button.delete-user').click(setupToDeleteUser)
    
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
    
    $('p.hide-password').click(function() {
        $(this).toggleClass('hide-password-dark')
    })
})