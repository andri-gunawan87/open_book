$(function () {
    $('#main-table').DataTable({
        columnDefs: [
            {
                targets: [0],
                width: "5%",
            },
            {
                targets: [0, 1, 3],
                createdCell: function (td) {
                    $(td).addClass('align-middle');
                }
            },
            {
                targets: [4, 5],
                createdCell: function (td) {
                    $(td).addClass('align-middle text-center');
                }
            }
        ],
        processing: true,
        info: true,
        autoWidth: false,
        responsive: true,
        ajax: {
            url: `/book/listbook`,
            dataSrc: 'data',
            dataType: 'json',
        
        },
        columns: [
            {
                data: null,
                render: (data, type, row, meta) => {
                    return ++meta.row
                }
            },
            {
                data: 'title',
                render: (data, type, row, meta) => {
                    return `<a class="nav-link" href="/book/detail?id=${row.id}" role="button" aria-expanded="false">
                                    ${data}
                                </a>`
                }
            },
            {
                data: 'author',
                render: (data, type, row, meta) => {
                    return data.name
                }
            },
            {
                data: 'details',
                render: (data, type, row, meta) => {
                    return data.price
                }
            },
            {
                data: 'details',
                render: (data, type, row, meta) => {
                    return data.totalPages
                }
            },
            {
                data: null,
                render: (data, type, row, meta) => {
                    return `<div>
                                <a class="btn btn-info btn-sm btn-icon" role="button" title="Edit Book" href="/book/update?id=${row.id}">
                                    <i class="link-icon" data-feather="edit"></i>
                                </a>
                                <button type="button" class="btn btn-danger btn-sm btn-icon delete-data" data-id="${row.id}" title="Delete Data">
                                    <i class="link-icon" data-feather="trash-2"></i>
                                </button>
                            </div>`
                }
            }
        ],
        initComplete: function (settings, json) {
            feather.replace()
            var table = this.api();
            table.on('draw.dt', function () {
                feather.replace();
            });
        }
    });    

    // delete data section
    $('#main-table').on('click', '.delete-data', function () {
        dataId = this.getAttribute("data-id")
        Swal.fire({
            icon: 'warning',
            title: "Delete ",
            text: "Hapus data ini?",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'btn btn-danger mx-2',
                cancelButton: 'btn btn-secondary mx-1'
            },
            buttonsStyling: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                $('#modal-loading').modal('show')
                $.ajax({
                    type: "DELETE",
                    dataType: "json",
                    contentType: "application/json",
                    url: `/book/deletebook?id=${dataId}`,
                    success: function (response) {
                        $('#modal-loading').modal('hide')

                        if (response.success == true) {
                            Swal.fire({
                                icon: 'success',
                                title: "Success!",
                                text: response.message,
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    jQuery('#main-table').DataTable().ajax.reload()
                                }
                            })
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: "Error!",
                                text: response.message,
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                }
                            })
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        $('#modal-loading').modal('hide')
                        console.log(jqXHR, textStatus);
                        Swal.fire({
                            icon: 'error',
                            title: "Error!",
                            text: jqXHR.responseJSON.message,
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#modal-loading').modal('hide')
                            }
                        })
                    }
                })
            }
        })
    })
});
