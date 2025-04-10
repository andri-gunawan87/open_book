using Newtonsoft.Json;
using Open_Book.Models.Scrap;

namespace Open_Book.Services
{
    public interface IScrapService
    {
        Task<bool> ScrapData(ScrapBookRequestVm requestVm);
    }

    public class ScrapService(HttpClient httpClient, ICurrentUserService currentUserService) : IScrapService
    {
        public async Task<bool> ScrapData(ScrapBookRequestVm requestVm)
        {
            var url = $"https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page={requestVm.Page}&year={requestVm.Year}";
            var response = await httpClient.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<BookScrapVm>(content);
                
                return true;
            }
            return false;
        }
    }
}
