using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Open_Book.Models;
using Open_Book.Services;

namespace Open_Book.Controllers;

public class HomeController(IDashboardService dashboardService) : Controller
{

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboarData(int page)
    {
        try
        {
            var result = await dashboardService.ListBookPerPage(page);
            return Json(new { success = true, message = "Success to retrieve data", data = result });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = ex.Message });
        }
    }
}
