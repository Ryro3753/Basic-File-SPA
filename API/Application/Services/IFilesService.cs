using Data.Models;

namespace Application.Services
{
    public interface IFilesService
    {
        IEnumerable<Files> GetFiles();
        IEnumerable<Files> GetFiles(FetchFileRequest request);
        Task<Files> InsertFile(Files file, Stream stream);
        IEnumerable<FileType> GetFilesType();
    }
}
