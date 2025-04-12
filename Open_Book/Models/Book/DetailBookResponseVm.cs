using Open_Book.Db.Entities;

namespace Open_Book.Models.Book
{
    public class DetailBookResponseVm
    {
        public string? Id { get; set; }
        public string? BookScrapId { get; set; }
        public string? Title { get; set; }
        public string? Summary { get; set; }

        public string? CoverImage { get; set; }

        public string? AuthorId { get; set; }
        public BookAuhtorResponseVm? Author { get; set; }

        public BookDetailsResponseVm? Details { get; set; }
        public List<BookTagsResponseVm>? BookTags { get; set; }
    }

    public class BookAuhtorResponseVm
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Url { get; set; }
    }

    public class BookDetailsResponseVm
    {
        public string? Id { get; set; }
        public string? NoGm { get; set; }
        public string? Isbn { get; set; }
        public decimal Price { get; set; }
        public int TotalPages { get; set; }
        public string? Size { get; set; }
        public DateTime? PublishedDate { get; set; }
    }

    public class BookTagsResponseVm
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

}
