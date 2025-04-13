namespace Open_Book.Models.Book
{
    public class PaginationBookResponse
    {
        public List<DetailBookResponseVm> Data { get; set; } = [];
        public int TotalPage { get; set; }
        public int CurrentPage { get; set; }
    }
}
