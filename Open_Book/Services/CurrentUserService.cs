using System.Security.Claims;

namespace Open_Book.Services
{
    public interface ICurrentUserService
    {
        string GetUserId();
    }

    public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
    {
        public string GetUserId()
        {
            return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new Exception("No user found");
        }
    }
}
