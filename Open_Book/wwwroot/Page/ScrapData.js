$(function () {
    $("#submit-form").on("click", async function (event) {
        event.preventDefault()

        let form = document.getElementById('scrap-form');
        if (form) {
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return false;
            }
            else {
                $('#modal-loading').modal('show');

                const requestData = {
                    Page: $('#page-number').val(),
                    Year: $('#book-year').val(),
                }

                $.ajax({
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    url: `/scrap/getdata`,
                    data: JSON.stringify(requestData),
                    success: function (response) {
                        $('#modal-loading').modal('hide');
                        if (response.success == true) {
                            Swal.fire({
                                icon: 'success',
                                title: "Success!",
                                allowOutsideClick: false,
                                text: response.message,
                                confirmButtonText: 'Ok'
                            }).then((result) => {
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
                        console.log(jqXHR, textStatus);
                        $('#modal-loading').modal('hide');
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
    });
});

