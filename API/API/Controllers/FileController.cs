using Application.Services;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class FileController : Controller
{

    private IFilesService _service;
    public FileController(IFilesService service)
    {
        _service = service;
    }

    [HttpPost("InsertFile")]
    public async Task<Files> InsertFileAsync()
    {
        var form = Request.Form;
        if (!form.ContainsKey("name") || !form.ContainsKey("fileType") || !form.ContainsKey("length"))
            throw new ArgumentOutOfRangeException();

        var fileInfo = new Files
        {
            Id = Guid.NewGuid(),
            CreatedDate = DateTime.Now,
            ModifiedDate = DateTime.Now,
            Name = form["name"],
            FileType = form["fileType"],
            Length = Convert.ToInt32(form["length"])
        };
        if (Request.Form.Files.Count == 1)
        {
            var filePath = _service.GetFilePath(fileInfo);

            using var stream = System.IO.File.Create(filePath);

            await Request.Form.Files[0].CopyToAsync(stream);

            return await _service.InsertFile(fileInfo);
        }
        else
            throw new FileNotFoundException("No file found to upload");
    }

    [HttpGet("GetFiles")]
    public IEnumerable<Files> GetFiles()
    {
        return _service.GetFiles();
    }

    [HttpGet("GetFileTypes")]
    public IEnumerable<FileType> GetFilesType()
    {
        return _service.GetFilesType();
    }

    [HttpGet("GetFilesByType")]
    public IEnumerable<Files> GetFilesByType([FromQuery] FetchFileRequest request)
    {
        return _service.GetFiles(request);
    }

    [HttpGet("DownloadFile")]
    public ActionResult DownloadFile([FromQuery] Files fileInfo)
    {
        var fileContent = _service.GetFileContent(fileInfo);

        return File(fileContent.Bytes, fileContent.ContentType, fileDownloadName: fileInfo.Name);
    }
}
