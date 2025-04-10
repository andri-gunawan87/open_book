$(document).ready(function () {
    $("#submit-form").on("click", async function (event) {
        event.preventDefault()

        let form = document.getElementById('scrap-form');
        if (form) {
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return false;
            }
            else {
                const requestData = {
                    Page: $('#page-number').val(),
                    Year: $('#book-year').val(),
                }

                console.log(requestData)

                $.ajax({
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    url: `/scrapbook/getdata`,
                    data: JSON.stringify(requestData),
                    //headers: {
                    //    Authorization: 'Bearer ' + jwtToken
                    //},
                    success: function (response) {
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

