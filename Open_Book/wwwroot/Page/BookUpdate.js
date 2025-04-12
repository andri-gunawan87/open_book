$(function () {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    const bookId = params.get('id');
    let bookDetailId;

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
    function getBookData() {
        return new Promise((resolve, reject) => {
            var request = $.ajax({
                url: `/book/detailjson?id=${bookId}`,
                method: "GET",
            }).done(function (response) {
                var data = response.data;
                
                $('#title').val(data.title);
                $('#summary').val(data.summary);
                $('#cover-image').val(data.coverImage);

                $('#author-name').val(data.author.name);
                $('#author-url').val(data.author.url);

                bookDetailId = data.details.id;
                $('#details-no-gm').val(data.details.noGm);
                $('#details-isbn').val(data.details.isbn);
                $('#details-price').val(data.details.price);
                $('#details-total-pages').val(data.details.totalPages);
                $('#details-size').val(data.details.size);

                var bookDate = new Date(data.details.publishedDate).toISOString().split('T')[0];
                $('#details-publish-date').val(bookDate);

                const selectedIdsTags = data.bookTags.map(tag => tag.id);
                $('#list-tags').val(selectedIdsTags).trigger('change');

                resolve();
            }).fail(function (jqXHR, textStatus) {
                console.log(jqXHR, textStatus);
                reject();
            });
        });
    }

    $("#update-book-button").click(async function (event) {
        event.preventDefault()

        const selectedTagIds = $('#list-tags').val();
        const bookTags = selectedTagIds.map(tagId => ({
            id: tagId
        }));

        const requestData = {
            Id: bookId,
            Title: $('#title').val(),
            Summary: $('#summary').val(),
            CoverImage: $('#cover-image').val(),
            BookAuthor: {
                Name: $('#author-name').val(),
                Url: $('#author-url').val()
            },
            BookDetails: {
                Id: bookDetailId,
                NoGm: $('#details-no-gm').val(),
                Isbn: $('#details-isbn').val(),
                Price: $('#details-price').val(),
                TotalPages: $('#details-total-pages').val(),
                Size: $('#details-size').val(),
                PublishedDate: $('#details-publish-date').val(),
            },
            BookTags: bookTags
        }

        console.log(requestData);

        let form = document.getElementById('update-book-form');

        if (form) {
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return false;
            }
            else {
                $('#modal-loading').modal('show')

                $.ajax({
                    type: "PUT",
                    dataType: "json",
                    contentType: "application/json",
                    url: `/book/updatebook`,
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
                                    window.location.assign(`/book/detail?id=${bookId}`)
                                }
                                else {
                                    window.location.assign(`/book/detail?id=${bookId}`)
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
        getTatgs()
    ]).then(() => 
        getBookData()
    ).catch((error) => {
        console.error("An error occurred:", error);
    });
});
