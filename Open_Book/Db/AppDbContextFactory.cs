using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Open_Book.Db
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        private const string _connectionStringName = "DefaultConnection";
        private const string _aspNetCoreEnvironment = "Development";

        public AppDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory()) // important
                .AddJsonFile($"appsettings.{_aspNetCoreEnvironment}.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString(_connectionStringName));

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
