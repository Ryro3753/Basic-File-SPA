using System.Net;

public class FileNotFoundException : Exception
{
  public HttpStatusCode StatusCode { get; init; } = HttpStatusCode.NotFound;
  public FileNotFoundException(string message)
    : base(message)
  {
  }
}