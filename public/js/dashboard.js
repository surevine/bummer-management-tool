$(document).ready(function() {
    if ($('.user-table').find('tbody tr').length > 0) {
        $('.user-table').DataTable()
    }
})