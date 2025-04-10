namespace Open_Book.Db.Entities
{
    public class BookDetails : BaseAuditTrail
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string NoGm { get; set; } = string.Empty;
        public string Isbn { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int TotalPages { get; set; }
        public string Size { get; set; } = string.Empty;
        public string PublishedDate { get; set; } = string.Empty;

        public string BookDataId { get; set; } = string.Empty;
        public BookData BookData { get; set; } = null!;

    }
}
