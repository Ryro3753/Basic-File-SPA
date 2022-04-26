using Middlewares;

namespace API.Extensions
{
    public static class MiddlewaresExtension
    {
        public static IApplicationBuilder UseMiddlewares(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            return app;
        }
    }
}
