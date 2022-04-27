using Application.Services;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

public class FileController : Controller
{
    private IFilesService _service;
    public FileController(IFilesService service)
    {
        _service = service;
    }

    [HttpPost("InsertFile")]
    public async Task<Files> InsertFileAsync(Files file)
    {
        if (Request.Form.Files.Count == 1)
        {
            return await _service.InsertFile(file, Request.Form.Files[0].OpenReadStream());
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
    public IEnumerable<Files> GetFilesByType(FetchFileRequest request)
    {
        return _service.GetFiles(request);
    }
}
