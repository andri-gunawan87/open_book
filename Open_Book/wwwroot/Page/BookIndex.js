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
            url: `/book/datatable`,
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
                    return data
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
                                <button type="button" class="btn btn-info btn-sm btn-icon edit-data" data-bs-toggle="modal" data-bs-target="#edit-data-modal" title="Edit Data">
                                    <i class="link-icon" data-feather="edit"></i>
                                </button>
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

    //// Data initialization (drop down data trigger)
    //$('#add-user-role').select2({
    //    placeholder: "Pilih Role",
    //    width: '100%',
    //    dropdownParent: $('#add-user-data-form').parent(),
    //    allowClear: true
    //});

    //$('.role-data').each(function () {
    //    var dropdownParent = $(document.body);

    //    if ($(this).closest('.modal').length) {
    //        dropdownParent = $(this).closest('.modal');
    //    } else if ($(this).closest('.custom-container').length) {
    //        dropdownParent = $(this).closest('.custom-container');
    //    }

    //    $(this).select2({
    //        placeholder: "Pilih Role",
    //        width: '100%',
    //        dropdownParent: dropdownParent,
    //        allowClear: true
    //    });
    //});


    //$('#add-user-id').select2({
    //    placeholder: "Ketik Nama/Nrp User",
    //    width: '100%',
    //    dropdownParent: $('#add-user-data-form').parent(),
    //    minimumInputLength: 3,
    //    ajax: {
    //        url: `${apiUrl}api/employee/search`,
    //        dataType: 'json',
    //        headers: {
    //            Authorization: 'Bearer ' + jwtToken
    //        },
    //        quietMillis: 100,
    //        delay: 250,
    //        data: function (params) {
    //            return {
    //                term: params.term
    //            };
    //        },
    //        processResults: function (data) {
    //            return {
    //                results: $.map(data.data, function (item) {
    //                    return {
    //                        text: item.employeeId + ' - ' + item.employeeName,
    //                        id: item.employeeId
    //                    };
    //                })
    //            };
    //        }
    //    },
    //});

    //function getRole() {
    //    return new Promise((resolve, reject) => {
    //        var request = $.ajax({
    //            url: `${apiUrl}api/user/role`,
    //            method: "GET",
    //            headers: {
    //                Authorization: 'Bearer ' + jwtToken
    //            },
    //        }).done(function (response) {
    //            response.data.forEach((val, idx) => {
    //                $('.role-data').append($('<option/>', {
    //                    value: val.id,
    //                    text: val.description
    //                }));
    //            });
    //            resolve();
    //        }).fail(function (jqXHR, textStatus) {
    //            console.log(jqXHR, textStatus);
    //            reject();
    //        });
    //    });
    //}

    //// add data section
    //$("#add-data-button").click(async function () {
    //    event.preventDefault()
    //    $('#modal-loading').modal('show')

    //    var employeeId = $("#add-user-id").val()
    //    var roleId = $("#add-user-role").val()

    //    const requestData = {
    //        EmployeeId: employeeId,
    //        RoleId: roleId,
    //        PerformedBy: userNrp
    //    }

    //    if (employeeId && roleId) {
    //        $.ajax({
    //            type: "POST",
    //            dataType: "json",
    //            contentType: "application/json",
    //            url: `${apiUrl}api/user/insert`,
    //            headers: {
    //                Authorization: 'Bearer ' + jwtToken
    //            },
    //            data: JSON.stringify(requestData),
    //            success: function (response) {
    //                if (response.success == true) {
    //                    Swal.fire({
    //                        icon: 'success',
    //                        title: "Success!",
    //                        text: response.message,
    //                        confirmButtonText: 'Ok'
    //                    }).then((result) => {
    //                        if (result.isConfirmed) {
    //                            $('#add-data-modal').modal('hide')
    //                            jQuery('#main-table').DataTable().ajax.reload()
    //                            $('#modal-loading').modal('hide')
    //                        }
    //                    })
    //                }
    //                else {
    //                    Swal.fire({
    //                        icon: 'error',
    //                        title: "Error!",
    //                        text: response.message,
    //                        confirmButtonText: 'Ok'
    //                    }).then((result) => {
    //                        if (result.isConfirmed) {
    //                            $('#modal-loading').modal('hide')
    //                        }
    //                    })
    //                }
    //            },
    //            error: function (jqXHR, textStatus) {
    //                $('#modal-loading').modal('hide')
    //                console.log(jqXHR, textStatus);
    //                Swal.fire({
    //                    icon: 'error',
    //                    title: "Error!",
    //                    text: jqXHR.responseJSON.message,
    //                    confirmButtonText: 'Ok'
    //                }).then((result) => {
    //                    if (result.isConfirmed) {
    //                        $('#modal-loading').modal('hide')
    //                    }
    //                })
    //            }
    //        })
    //    }
    //    else {
    //        Swal.fire({
    //            icon: 'error',
    //            title: "Error!",
    //            text: "Data input tidak lengkap!",
    //            confirmButtonText: 'Ok'
    //        }).then((result) => {
    //            if (result.isConfirmed) {
    //                $('#modal-loading').modal('hide')
    //            }
    //        })
    //    }
    //});

    //// edit data section
    //$('#main-table tbody').on('click', '.edit-data', function () {
    //    $("#edit-user-role").val('').trigger('change')

    //    var data = $('#main-table').DataTable().row($(this).parents('tr')).data();
    //    $('#edit-user-name').val(data.employeeName)
    //    $('#user-id').val(data.employeeId)
    //    $('#edit-user-role').val(data.roleId).trigger('change')
    //    dataId = data.id
    //})

    //$("#edit-data-button").click(async function () {
    //    event.preventDefault()
    //    $('#modal-loading').modal('show')

    //    var roleId = $('#edit-user-role').val()

    //    const requestData = {
    //        Id: dataId,
    //        RoleId: roleId,
    //        PerformedBy: userNrp
    //    }

    //    if (dataId && roleId) {
    //        $.ajax({
    //            type: "PUT",
    //            dataType: "json",
    //            contentType: "application/json",
    //            url: `${apiUrl}api/user/edit`,
    //            headers: {
    //                Authorization: 'Bearer ' + jwtToken
    //            },
    //            data: JSON.stringify(requestData),
    //            success: function (response) {
    //                if (response.success == true) {
    //                    Swal.fire({
    //                        icon: 'success',
    //                        title: "Success!",
    //                        text: response.message,
    //                        confirmButtonText: 'Ok'
    //                    }).then((result) => {
    //                        if (result.isConfirmed) {
    //                            $('#edit-data-modal').modal('hide')
    //                            jQuery('#main-table').DataTable().ajax.reload()
    //                            $('#modal-loading').modal('hide')
    //                        }
    //                    })
    //                }
    //                else {
    //                    Swal.fire({
    //                        icon: 'error',
    //                        title: "Error!",
    //                        text: response.message,
    //                        confirmButtonText: 'Ok'
    //                    }).then((result) => {
    //                        if (result.isConfirmed) {
    //                            $('#modal-loading').modal('hide')
    //                        }
    //                    })
    //                }
    //            },
    //            error: function (jqXHR, textStatus) {
    //                $('#modal-loading').modal('hide')
    //                console.log(jqXHR, textStatus);
    //                Swal.fire({
    //                    icon: 'error',
    //                    title: "Error!",
    //                    text: jqXHR.responseJSON.message,
    //                    confirmButtonText: 'Ok'
    //                }).then((result) => {
    //                    if (result.isConfirmed) {
    //                        $('#modal-loading').modal('hide')
    //                    }
    //                })
    //            }
    //        })
    //    }
    //    else {
    //        Swal.fire({
    //            icon: 'error',
    //            title: "Error!",
    //            text: "Data input tidak lengkap!",
    //            confirmButtonText: 'Ok'
    //        }).then((result) => {
    //            if (result.isConfirmed) {
    //                $('#modal-loading').modal('hide')
    //            }
    //        })
    //    }
    //});

    //// delete data section
    //$('#main-table').on('click', '.delete-data', function () {
    //    dataId = this.getAttribute("data-id")
    //    Swal.fire({
    //        icon: 'warning',
    //        title: "Delete ",
    //        text: "Hapus data ini?",
    //        showCancelButton: true,
    //        confirmButtonText: 'Delete',
    //        cancelButtonText: 'Cancel',
    //        customClass: {
    //            confirmButton: 'btn btn-danger mx-2',
    //            cancelButton: 'btn btn-secondary mx-1'
    //        },
    //        buttonsStyling: false,
    //    }).then(async (result) => {
    //        if (result.isConfirmed) {
    //            $('#modal-loading').modal('show')
    //            $.ajax({
    //                type: "DELETE",
    //                dataType: "json",
    //                contentType: "application/json",
    //                url: `${apiUrl}api/user/delete?id=${dataId}&performedby=${userNrp}`,
    //                headers: {
    //                    Authorization: 'Bearer ' + jwtToken
    //                },
    //                success: function (response) {
    //                    if (response.success == true) {
    //                        Swal.fire({
    //                            icon: 'success',
    //                            title: "Success!",
    //                            text: response.message,
    //                            confirmButtonText: 'Ok'
    //                        }).then((result) => {
    //                            if (result.isConfirmed) {
    //                                jQuery('#main-table').DataTable().ajax.reload()
    //                                $('#modal-loading').modal('hide')
    //                            }
    //                        })
    //                    }
    //                    else {
    //                        Swal.fire({
    //                            icon: 'error',
    //                            title: "Error!",
    //                            text: response.message,
    //                            confirmButtonText: 'Ok'
    //                        }).then((result) => {
    //                            if (result.isConfirmed) {
    //                                $('#modal-loading').modal('hide')
    //                            }
    //                        })
    //                    }
    //                },
    //                error: function (jqXHR, textStatus) {
    //                    $('#modal-loading').modal('hide')
    //                    console.log(jqXHR, textStatus);
    //                    Swal.fire({
    //                        icon: 'error',
    //                        title: "Error!",
    //                        text: jqXHR.responseJSON.message,
    //                        confirmButtonText: 'Ok'
    //                    }).then((result) => {
    //                        if (result.isConfirmed) {
    //                            $('#modal-loading').modal('hide')
    //                        }
    //                    })
    //                }
    //            })
    //        }
    //    })
    //})

    //Promise.all([
    //    getRole(),
    //]).then(() => {
    //    $('#modal-loading').modal('hide');
    //}).catch((error) => {
    //    console.error("An error occurred:", error);
    //});
});
