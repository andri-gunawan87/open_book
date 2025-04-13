$(async function () {
    let currentPage = 1;

    try {
        async function getFirstPageData() {
            let response = await $.ajax({ url: `/home/GetDashboarData?page=${currentPage}`, method: "GET" });
            let data = response.data.data;
            currentPage = response.data.currentPage;
            let totalPage = response.data.totalPage;

            updateBook(data);
            updatePaginationBook(currentPage, totalPage);
        }

        function updateBook(data) {
            let rootElement = $(`#root-list-book`);
            rootElement.empty();

            data.forEach((val, idx) => {
                let newElement =
                    $(`<div class="col-lg-3 col-md-6 col-sm-12">
						<a href="/book/detail?id=${val.id}">
							<img src="${val.coverImage}" 
                                alt="${val.title}" width="170" height="auto">
						</a>
						<div class="book__wrapper-custom">
							<a href="/book/detail?id=${val.id}">
								<div class="carousel__title">${val.title}</div>
							</a>
							<div class="category-author__thanone">
								<a href="${val.author.url}">
									<span class="carousel__author">
										${val.author.name}
									</span>
								</a>
							</div>
						</div>
					</div>`);
                rootElement.append(newElement);
            })
        }

        function updatePaginationBook(currentPage, totalPage) {
            let paginationElement = $(`#pagination`);
            paginationElement.empty();

            if (currentPage > 1) {
                let minimumPage = currentPage - 3;
                minimumPage = minimumPage < 1 ? 1 : minimumPage;

                for (let i = minimumPage; i < currentPage; i++) {
                    let newElement = $(`<li class="page-item">
                                        <a class="page-link" href="#">${i}</a>
                                    </li>`);
                    paginationElement.append(newElement);
                }
            }

            let maximumPage = currentPage + 3
            maximumPage = maximumPage > totalPage ? totalPage : maximumPage
            for (let i = currentPage; i <= maximumPage; i++) {
                let newElement = $(`<li class="page-item ${currentPage === i ? 'active' : ''}">
                                        <a class="page-link" href="#">${i}</a>
                                    </li>`);
                paginationElement.append(newElement);
            }
        }

        $('#pagination').on('click', '.page-link', function () {
            let pageNumber = this.text

            $.ajax({
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                url: `/home/GetDashboarData?page=${pageNumber}`,
                success: function (response) {
                    $('#modal-loading').modal('hide')
                    if (response.success == true) {
                        let data = response.data.data;
                        currentPage = response.data.currentPage;
                        let totalPage = response.data.totalPage;

                        updateBook(data, currentPage, totalPage);
                        updatePaginationBook(currentPage, totalPage);
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
        })

        await getFirstPageData();
        $('#modal-loading').modal('hide');
    } catch (error) {
        console.error("An error occurred:", error);
    }
});