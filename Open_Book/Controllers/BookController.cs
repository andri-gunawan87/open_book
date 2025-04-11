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

        [HttpGet]
        public async Task<IActionResult> DataTable()
        {
            try
            {
                var result = await bookService.ListDataTableBook();
                return Json(new { success = true, message = "Success to get data", data = result });
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
                return Json(new { success = true, message = "Success to get data", data = result });

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
    }
}
