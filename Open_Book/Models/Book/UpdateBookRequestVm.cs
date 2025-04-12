namespace Open_Book.Models.Book
{
    public class UpdateBookRequestVm
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;

        public string CoverImage { get; set; } = string.Empty;

        public string AuthorId { get; set; } = string.Empty;
        public UpdateBookAuhtorRequestVm BookAuthor { get; set; } = new UpdateBookAuhtorRequestVm();

        public UpdateBookDetailsRequestVm BookDetails { get; set; } = new UpdateBookDetailsRequestVm();
        public List<UpdateBookTagsRequestVm> BookTags { get; set; } = [];
    }

    public class UpdateBookAuhtorRequestVm
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

    public class UpdateBookDetailsRequestVm
    {
        public string Id { get; set; } = string.Empty;
        public string NoGm { get; set; } = string.Empty;
        public string Isbn { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int TotalPages { get; set; }
        public string Size { get; set; } = string.Empty;
        public DateTime PublishedDate { get; set; }
    }

    public class UpdateBookTagsRequestVm
    {
        public string Id { get; set; } = string.Empty;
    }
}
