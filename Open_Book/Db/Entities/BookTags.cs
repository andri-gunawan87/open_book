namespace Open_Book.Db.Entities
{
    public class BookTags : BaseAuditTrail
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string BookDataId { get; set; } = string.Empty;
        public BookData BookData { get; set; } = null!;
        public string TagId { get; set; } = string.Empty;
        public Tags Tag { get; set; } = null!;
    }
}
