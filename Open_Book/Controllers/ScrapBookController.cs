using Microsoft.AspNetCore.Mvc;
using Open_Book.Models.Scrap;
using Open_Book.Services;

namespace Open_Book.Controllers
{
    public class ScrapBookController : Controller
    {
        private readonly IScrapService _scrapService;

        public ScrapBookController(IScrapService scrapService)
        {
            _scrapService = scrapService;
        }

        public async Task<IActionResult> Index(string page)
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetData([FromBody]ScrapBookRequestVm requestVm)
        {
            var isSuccess = await _scrapService.ScrapData(requestVm);

            if (isSuccess)
            {
                return Ok(new { success = true,message = "Success to scrap data"  });
            }
            return BadRequest(new { success = false, message = "Failed to scrap data" });
        }

    }
}
