$(function () {
    $('#list-tags').select2({
        placeholder: "Pilih Kategori",
        width: '100%',
        allowClear: true
    });
    function getTatgs() {
        return new Promise((resolve, reject) => {
            var request = $.ajax({
                url: `/book/listtags`,
                method: "GET",
            }).done(function (response) {
                response.data.forEach((val, idx) => {
                    $('#list-tags').append($('<option/>', {
                        value: val.id,
                        text: val.name
                    }));
                });
                resolve();
            }).fail(function (jqXHR, textStatus) {
                console.log(jqXHR, textStatus);
                reject();
            });
        });
    }

    $("#submit-book-button").click(async function (event) {
        event.preventDefault()

        const selectedTagIds = $('#list-tags').val();
        const bookTags = selectedTagIds.map(tagId => ({
            id: tagId
        }));

        const requestData = {
            Title: $('#title').val(),
            Summary: $('#summary').val(),
            CoverImage: $('#cover-image').val(),
            BookAuthors: {
                Name: $('#author-name').val(),
                Url: $('#author-url').val()
            },
            BookDetails: {
                NoGm: $('#details-no-gm').val(),
                Isbn: $('#details-isbn').val(),
                Price: $('#details-price').val(),
                TotalPages: $('#details-total-pages').val(),
                Size: $('#details-size').val(),
                PublishedDate: $('#details-publish-date').val(),
            },
            BookTags: bookTags
        }

        let form = document.getElementById('create-book-form');

        if (form) {
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return false;
            }
            else {
                $('#modal-loading').modal('show')

                $.ajax({
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    url: `/book/createbook`,
                    data: JSON.stringify(requestData),
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
                                    window.location.assign(`/book`)
                                }
                                else {
                                    window.location.assign(`/book`)
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
                            }
                        })
                    }
                })
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: "Error!",
                text: "Data input tidak lengkap!",
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                }
            })
        }
    });

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

    Promise.all([
        getTatgs(),
    ]).then(() => {
        $('#modal-loading').modal('hide');
    }).catch((error) => {
        console.error("An error occurred:", error);
    });
});
