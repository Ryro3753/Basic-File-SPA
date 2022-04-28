using Data.Models;

namespace Application.Services
{
    public interface IFilesService
    {
        IEnumerable<Files> GetFiles();
        IEnumerable<Files> GetFiles(FetchFileRequest request);
        Task<Files> InsertFile(Files file);
        IEnumerable<FileType> GetFilesType();
        FileContent GetFileContent(Files fileInfo);
        string GetFilePath(Files fileInfo);
    }
}
