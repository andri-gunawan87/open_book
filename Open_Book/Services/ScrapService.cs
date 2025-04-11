using Microsoft.EntityFrameworkCore;
using Open_Book.Db;
using Open_Book.Db.Entities;
using Open_Book.Helper;
using Open_Book.Models.Scrap;
using System.Text.Json;
using BookData = Open_Book.Db.Entities.BookData;
using Tags = Open_Book.Db.Entities.Tags;

namespace Open_Book.Services
{
    public interface IScrapService
    {
        Task<bool> ScrapData(ScrapBookRequestVm requestVm);
    }

    public class ScrapService(HttpClient httpClient, ICurrentUserService currentUserService, AppDbContext dbContext) : IScrapService
    {
        public async Task<bool> ScrapData(ScrapBookRequestVm requestVm)
        {
            try
            {
                var url = $"https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page={requestVm.Page}&year={requestVm.Year}";
                var response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };
                    var data = JsonSerializer.Deserialize<BookScrapVm>(content, options);

                    if (data == null)
                    {
                        return false;
                    }

                    var listTags = await dbContext.Tags.ToListAsync();
                    var listAuthor = await dbContext.BookAuthors.ToListAsync();

                    if (data.Books.Count != 0)
                    {
                        List<BookData> books = new List<BookData>();

                        foreach (var book in data.Books)
                        {
                            var isBookExists = dbContext.BookData.Any(b => b.BookScrapId == book.Id);
                            if (isBookExists)
                            {
                                continue;
                            }

                            var newBook = new BookData
                            {
                                BookScrapId = book.Id,
                                Title = book.Title,
                                Summary = book.Summary,
                                CoverImage = book.CoverImage,
                            };

                            var bookAuthor = new BookAuthor();

                            var existingBookAuthor = listAuthor.FirstOrDefault(x => x.Name == book.Author.Name);

                            if (existingBookAuthor == null)
                            {
                                bookAuthor = new BookAuthor
                                {
                                    Name = book.Author.Name,
                                    Url = book.Author.Url
                                };

                                listAuthor.Add(bookAuthor);
                            }
                            else
                            {
                                bookAuthor = existingBookAuthor;
                            }

                            newBook.Author = bookAuthor;

                            newBook.Details = new BookDetails
                            {
                                NoGm = book.Details.NoGm,
                                Isbn = book.Details.Isbn,
                                Price = BookScrapHelpers.ParsePrice(book.Details.Price),
                                TotalPages = BookScrapHelpers.ParseTotalPages(book.Details.TotalPages),
                                Size = book.Details.Size,
                                PublishedDate = BookScrapHelpers.ParsePublishedDate(book.Details.PublishedDate)
                            };

                            List<BookTags> newListBookTags = [];

                            var distinctTags = book.Tags
                                                .GroupBy(t => t.Name)
                                                .Select(g => g.First())
                                                .ToList();

                            foreach (var tag in distinctTags)
                            {
                                var existingTag = listTags.FirstOrDefault(t => t.Name == tag.Name);
                                if (existingTag == null)
                                {
                                    var newTag = new Tags
                                    {
                                        Name = tag.Name,
                                        Url = tag.Url
                                    };
                                    listTags.Add(newTag);
                                    dbContext.Tags.Add(newTag);

                                    newListBookTags.Add(new BookTags
                                    {
                                        Tag = newTag,
                                        BookData = newBook
                                    });
                                }
                                else
                                {
                                    newListBookTags.Add(new BookTags
                                    {
                                        Tag = existingTag,
                                        BookData = newBook
                                    });
                                }
                            }

                            newBook.BookTags = newListBookTags;
                            books.Add(newBook);
                        }
                        await dbContext.BookData.AddRangeAsync(books);
                        await dbContext.SaveChangesAsync();
                    }
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
