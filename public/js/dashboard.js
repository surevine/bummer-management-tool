$(document).ready(function() {
    if ($('.user-table').find('tbody tr').length > 5) {
        $('.user-table').DataTable()
    }
    
        
    /* ---- Delete user ---- */
    
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
    
    
    /* ---- Reset password ---- */
    
    var passwordReset = function(e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        var jid = $(this).attr('data-jid')
        $('#reset-user-password span.jid').html(jid)
        $('#reset-user-password').modal('show') 
    }
    
    $('.user-table').on('click', 'i.reset-user-password', passwordReset)
    $('button.reset-user-password').click(passwordReset)
        
    $('#reset-user-password button.reset-password').click(function() {
        var jid = $('#reset-user-password span.jid').html()
        var url = '/user/password-reset/' + jid
        
        var passwordResetDone = function(data) {
            $('#reset-user-password').modal('hide')

            if (404 === data.status) {
                data = {
                    error: 'Unknown error, please close and try again'
                }
            }
            if (data.error) {
                var modal = $('#reset-user-password-fail')
                modal.find('span.error').html(data.error)
                modal.modal('show')
            } else {
                var modal = $('#reset-user-password-success')
                modal.find('p.hide-password').html(data.password)
                modal.find('p.jid').html(jid)
                modal.modal('show')
            }
        }
        var xhr = $.get(url, {}, passwordResetDone)
        xhr.fail(passwordResetDone)
    })
    
    
    /* ---- End session ---- */
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

    
    /* ---- Remove administrator ---- */
    
    var setupToRemoveAdmin = function(e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        var jid = $(this).attr('data-jid')
        $('#remove-admin span.jid').html(jid)
        $('#remove-admin a').attr('href', '/admin/remove/' + jid)
        $('#remove-admin').modal('show')
        console.log($('#remove-admin'))
    }
    $('.user-table').on('click', 'i.remove-admin', setupToRemoveAdmin)
    
        
    /* ---- Toggle password view ---- */
    
    $('p.hide-password').click(function() {
        $(this).toggleClass('hide-password-dark')
    })
    
    
})