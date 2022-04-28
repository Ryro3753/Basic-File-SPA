using Data.Models;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class FilesService : IFilesService
    {
        private AppDbContext _context;
        public FilesService(AppDbContext context)
        {
            _context = context;
        }

        private string GetFileFolderPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "Files");
        }

        public string GetFilePath(Files fileInfo)
        {
            var folderPath = GetFileFolderPath();
            var fileExtension = Path.GetExtension(fileInfo.Name);
            var fileName = fileInfo.Id + fileExtension;
            return Path.Combine(folderPath, fileName);
        }

        private string GetFileName(Files fileInfo)
        {
            var fileExtension = Path.GetExtension(fileInfo.Name);
            return fileInfo.Name + fileExtension;
        }

        public IEnumerable<Files> GetFiles()
        {
            return _context.Files.AsEnumerable();
        }

        //This function fetch only partial of files, developed for infinite scroll 
        public IEnumerable<Files> GetFiles(FetchFileRequest request)
        {
            return _context.Files.Where(i => i.FileType == request.Type).OrderByDescending(i => i.CreatedDate).Skip(request.StartFrom).Take(request.Size).AsEnumerable();
        }

        public async Task<Files> InsertFile(Files fileInfo)
        {
            await _context.Files.AddAsync(fileInfo);

            var fileExtension = Path.GetExtension(fileInfo.Name);

            if (fileExtension != fileInfo.FileType)
                throw new FileTypeException("File Types Are Not Matches");

            await _context.SaveChangesAsync();
            return fileInfo;

        }

        public IEnumerable<FileType> GetFilesType()
        {
            var files = _context.Files.Select(i => i.FileType).Distinct();
            var filetypes = new List<FileType>();

            foreach (var item in files)
            {
                filetypes.Add(new FileType
                {
                    Type = item,
                    Count = _context.Files.Count(i => i.FileType == item)
                });
            }

            return filetypes;
        }

        public FileContent GetFileContent(Files fileInfo)
        {
            var path = GetFilePath(fileInfo);
            var contentType = "application/metadata";
            var bytes = File.ReadAllBytes(path);
            return new FileContent { 
                Bytes = bytes,
                ContentType = contentType,
                Path = GetFileName(fileInfo)
            };
        }

    }
}
