using Microsoft.EntityFrameworkCore;
using Open_Book.Db;
using Open_Book.Models.Book;

namespace Open_Book.Services
{
    public interface IDashboardService
    {
        Task<PaginationBookResponse> ListBookPerPage(int pageNumber = 1);
    }

    public class DashboardService(AppDbContext dbContext) : IDashboardService
    {
        public async Task<PaginationBookResponse> ListBookPerPage(int pageNumber = 1)
        {
            var pageSize = 20;
            var skip = (pageNumber - 1) * pageSize;
            var totalBooks = await dbContext.BookData.CountAsync();

            var books = await dbContext.BookData
                .Include(b => b.Author)
                .Include(b => b.Details)
                .Include(b => b.BookTags)
                .ThenInclude(bt => bt.Tag)
                .Skip(skip)
                .Take(20)
                .ToListAsync();

            var response = books.Select(b => new DetailBookResponseVm
            {
                Id = b.Id,
                BookScrapId = b.BookScrapId,
                Title = b.Title,
                CoverImage = b.CoverImage,
                Summary = b.Summary,
                AuthorId = b.AuthorId,
                Author = new BookAuhtorResponseVm
                {
                    Id = b.Author.Id,
                    Name = b.Author.Name,
                    Url = b.Author.Url
                },
                Details = new BookDetailsResponseVm
                {
                    Id = b.Details.Id,
                    NoGm = b.Details.NoGm,
                    Isbn = b.Details.Isbn,
                    Price = b.Details.Price,
                    TotalPages = b.Details.TotalPages,
                    Size = b.Details.Size,
                    PublishedDate = b.Details.PublishedDate
                },
                BookTags = [.. b.BookTags.Select(bt => new BookTagsResponseVm
                {
                    Name = bt.Tag.Name,
                    Url = bt.Tag.Url
                })]
            }).ToList();

            var result = new PaginationBookResponse
            {
                Data = response,
                TotalPage = (int)Math.Ceiling((double)totalBooks / pageSize),
                CurrentPage = pageNumber
            };
            return result;

        }
    }
}
