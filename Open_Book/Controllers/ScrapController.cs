using Microsoft.AspNetCore.Mvc;
using Open_Book.Models.Scrap;
using Open_Book.Services;

namespace Open_Book.Controllers
{
    public class ScrapController : Controller
    {
        private readonly IScrapService _scrapService;

        public ScrapController(IScrapService scrapService)
        {
            _scrapService = scrapService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
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
