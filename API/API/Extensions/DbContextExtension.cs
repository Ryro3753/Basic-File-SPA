using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class DbContextExtension
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services)
        {
            services.AddEntityFrameworkSqlite().AddDbContext<AppDbContext>();

            return services;
        }
    }
}
