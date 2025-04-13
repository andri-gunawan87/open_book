using Microsoft.AspNetCore.Mvc;
using Open_Book.Models.Book;
using Open_Book.Services;

namespace Open_Book.Controllers
{
    public class BookController(IBookService bookService) : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        public async Task<IActionResult> Detail(string id)
        {
            var book = await bookService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        public async Task<IActionResult> DetailJson(string id)
        {
            try
            {
                var result = await bookService.GetBook(id);
                return Json(new { success = true, message = "Success to retrieve data", data = result });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }


        public IActionResult Update(string id)
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> ListBook()
        {
            try
            {
                var result = await bookService.ListBook();
                return Json(new { success = true, message = "Success to retrieve data", data = result });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> ListTags()
        {
            try
            {
                var result = await bookService.ListTags();
                return Json(new { success = true, message = "Success to retrieve data", data = result });

            }
            catch (Exception ex)
            {

                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody]CreateBookRequestVm requestVm)
        {
            try
            {
                var result = await bookService.CreateBook(requestVm);
                return Json(new { success = result.Item1, message = result.Item2 });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBook([FromBody]UpdateBookRequestVm requestVm)
        {
            try
            {
                var result = await bookService.UpdateBook(requestVm);
                return Json(new { success = result.Item1, message = result.Item2 });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBook(string id)
        {
            try
            {
                var result = await bookService.DeleteBook(id);
                return Json(new { success = result.Item1, message = result.Item2 });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}
