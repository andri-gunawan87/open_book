namespace Open_Book.Models.Book
{
    public class CreateBookRequestVm
    {
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string CoverImage { get; set; } = string.Empty;
        public BookDetailsRequestVm BookDetails { get; set; } = new BookDetailsRequestVm();
        public BookAuthorsRequestVm BookAuthors { get; set; } = new BookAuthorsRequestVm();
        public List<BookTagsRequestVm> BookTags { get; set; } = [];

    }

    public class BookDetailsRequestVm
    {
        public string NoGm { get; set; } = string.Empty;
        public string Isbn { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int TotalPages { get; set; }
        public string Size { get; set; } = string.Empty;
        public DateTime? PublishedDate { get; set; }
    }
    
    public class BookAuthorsRequestVm
    {
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

    public class BookTagsRequestVm
    {
        public string Id { get; set; } = string.Empty;
    }
}
