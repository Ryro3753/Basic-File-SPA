namespace Middlewares;

public class ExceptionMiddleware
{
  private readonly RequestDelegate _next;
  private readonly ILogger<ExceptionMiddleware> _logger;

  public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
  {
    _next = next;
    _logger = logger;
  }

  public async Task Invoke(HttpContext httpContext)
  {
    try
    {
      await _next.Invoke(httpContext);
    }
    catch (Exception ex)
    {
      //Caching exception and only returns exception message, log the stack trace etc. This can be supported with Kibana, Elastic Search
      httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
      await httpContext.Response.WriteAsJsonAsync(new { message = ex.Message });
      _logger.LogError(ex, "Exception captured");
    }
  }

}