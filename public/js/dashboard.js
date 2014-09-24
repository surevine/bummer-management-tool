$(document).ready(function() {
    if ($('.user-table').find('tbody tr').length > 5) {
        $('.user-table').DataTable()
    }
})