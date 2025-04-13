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

    Promise.all([
        getTatgs(),
    ]).then(() => {
        $('#modal-loading').modal('hide');
    }).catch((error) => {
        console.error("An error occurred:", error);
    });
});
