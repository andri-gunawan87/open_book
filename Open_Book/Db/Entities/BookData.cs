using Open_Book.Models.Scrap;

namespace Open_Book.Db.Entities
{
    public class BookData : BaseAuditTrail
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string BookScrapId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;

        public string AuthorId { get; set; } = string.Empty;
        public BookAuthor Author { get; set; } = null!;

        public BookDetails Details { get; set; } = null!;
        public ICollection<BookTags> BookTags { get; set; } = [];
    }
}
