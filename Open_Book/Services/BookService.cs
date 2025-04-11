using Microsoft.EntityFrameworkCore;
using Open_Book.Db;
using Open_Book.Db.Entities;
using Open_Book.Helper;
using Open_Book.Models.Book;

namespace Open_Book.Services
{
    public interface IBookService
    {
        Task<List<DatatableBookResponseVm>> ListDataTableBook();
        Task<List<TagsResponseVm>> ListTags();
        Task<Tuple<bool, string>> CreateBook(CreateBookRequestVm request);
    }

    public class BookService(AppDbContext dbContext) : IBookService
    {
        public async Task<List<DatatableBookResponseVm>> ListDataTableBook()
        {
            var books = await dbContext.BookData
                .Include(b => b.Author)
                .Include(b => b.Details)
                .Include(b => b.BookTags)
                .ThenInclude(bt => bt.Tag)
                .ToListAsync();

            var response = books.Select(b => new DatatableBookResponseVm
            {
                Id = b.Id,
                BookScrapId = b.BookScrapId,
                Title = b.Title,
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
                BookTags = b.BookTags.Select(bt => new BookTagsResponseVm
                {
                    Name = bt.Tag.Name,
                    Url = bt.Tag.Url
                }).ToList()
            }).ToList();
            return response;
        }

        public async Task<List<TagsResponseVm>> ListTags()
        {
            var tags = await dbContext.Tags.ToListAsync();
            var response = tags.Select(t => new TagsResponseVm
            {
                Id = t.Id,
                Name = t.Name,
                Url = t.Url
            }).ToList();
            return response;
        }

        public async Task<Tuple<bool, string>> CreateBook(CreateBookRequestVm request)
        {
            try
            {
                var existingBook = await dbContext.BookData.FirstOrDefaultAsync(b => b.Title == request.Title);

                if (existingBook != null)
                {
                    return Tuple.Create(false, "Book already exists");
                }

                var newBook = new BookData
                {
                    BookScrapId = BookScrapHelpers.GenerateRandomHex24(),
                    Title = request.Title,
                    Summary = request.Summary,
                    CoverImage = request.CoverImage,
                    Details = new BookDetails
                    {
                        NoGm = request.BookDetails.NoGm,
                        Isbn = request.BookDetails.Isbn,
                        Price = request.BookDetails.Price,
                        TotalPages = request.BookDetails.TotalPages,
                        Size = request.BookDetails.Size,
                        PublishedDate = request.BookDetails.PublishedDate
                    },
                };

                // Author
                var bookAuthor = new BookAuthor();

                var existingAuthor = await dbContext.BookAuthors.FirstOrDefaultAsync(a => a.Name == request.BookAuthors.Name);

                if (existingAuthor != null)
                {
                    bookAuthor = existingAuthor;
                }
                else
                {
                    bookAuthor.Name = request.BookAuthors.Name;
                    bookAuthor.Url = request.BookAuthors.Url;
                }

                newBook.Author = bookAuthor;

                // Tags
                var listTagsRequest = request.BookTags.Select(x => x.Id).ToList();
                var listTagResponse = await dbContext.Tags
                                    .Where(x => listTagsRequest.Contains(x.Id))
                                    .ToListAsync();

                newBook.BookTags = listTagResponse.Select(x => new BookTags
                                    {
                                        Tag = x,
                                        BookData = newBook
                                    }).ToList();

                await dbContext.BookData.AddAsync(newBook);
                await dbContext.SaveChangesAsync();

                return Tuple.Create(true, "Success to create book");
            }
            catch (Exception ex)
            {
                return Tuple.Create(false, ex.Message);
            }
        }
    }
}
