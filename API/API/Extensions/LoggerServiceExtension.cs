using Application.Services;

namespace API.Extensions
{
    public static class LoggerServiceExtension
    {
        public static IServiceCollection AddLoggerService(this IServiceCollection services)
        {
            services.AddSingleton(sp => sp.GetRequiredService<ILoggerFactory>().CreateLogger("DefaultLogger"));
            return services;
        }
    }
}
