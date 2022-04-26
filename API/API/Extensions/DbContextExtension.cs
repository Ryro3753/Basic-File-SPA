namespace API.Extensions
{
    public static class DbContextExtension
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services)
        {
            services.AddEntityFrameworkSqlite().AddDbContext<AppDbContext>();

            using (var client = new AppDbContext())
            {
                client.Database.EnsureCreated();
            }

            return services;
        }
    }
}
