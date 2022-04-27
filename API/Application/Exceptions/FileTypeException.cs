using System.Net;

public class FileTypeException : Exception
{
  public HttpStatusCode StatusCode { get; init; } = HttpStatusCode.NotFound;
  public FileTypeException(string message)
    : base(message)
  {
  }
}