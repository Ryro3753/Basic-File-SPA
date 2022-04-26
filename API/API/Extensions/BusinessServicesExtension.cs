using Application.Services;

namespace API.Extensions
{
    public static class BusinessServicesExtension
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddTransient<IFilesService, FilesService>();
            return services;
        }
    }
}
