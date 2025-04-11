using System.Text.Json.Serialization;

namespace Open_Book.Models.Scrap
{
    public class BookScrapVm
    {
        public List<BookData> Books { get; set; } = [];
    }

    public class BookData
    {
        [JsonPropertyName("_id")]
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public Author Author { get; set; } = new Author();
        public string Summary { get; set; } = string.Empty;
        public Details Details { get; set; } = new Details();
        public List<Tags> Tags { get; set; } = [];
    }

    public class Author
    {
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

    public class Details
    {
        [JsonPropertyName("no_gm")]
        public string NoGm { get; set; } = string.Empty;
        public string Isbn { get; set; } = string.Empty;
        [JsonPropertyName("total_pages")]
        public string TotalPages { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        [JsonPropertyName("published_date")]
        public string PublishedDate { get; set; } = string.Empty;
    }

    public class Tags
    {
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }
}
