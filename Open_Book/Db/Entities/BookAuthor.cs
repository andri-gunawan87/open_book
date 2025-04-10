namespace Open_Book.Db.Entities
{
    public class BookAuthor : BaseAuditTrail
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;

        public ICollection<BookData> Books { get; set; } = [];
    }
}
