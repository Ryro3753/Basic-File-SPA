using Data.Models;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class FilesService : IFilesService
    {
        private AppDbContext _context;
        private ILogger _logger;
        public FilesService(AppDbContext context, ILogger logger)
        {
            _context = context;
            _logger = logger;
        }

        private string GetFileFolderPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "Files");
        }

        public IEnumerable<Files> GetFiles()
        {
            return _context.Files.AsEnumerable();
        }

        public IEnumerable<Files> GetFiles(FetchFileRequest request)
        {
            return _context.Files.Where(i => i.FileType == request.Type).OrderBy(i => i.CreatedDate).Skip(request.StartFrom).Take(request.Size).AsEnumerable();
        }

        public async Task<Files> InsertFile(Files file, Stream stream)
        {
            await _context.Files.AddAsync(file);

            var fileExtension = Path.GetExtension(file.Name);

            if (fileExtension != file.FileType)
                throw new FileTypeException("File Types Are Not Matches");

            var folderPath = GetFileFolderPath();
            var fileName = file.Id + fileExtension;
            var path = Path.Combine(folderPath, fileName);

            var item = File.Create(path);
            await item.CopyToAsync(stream);

            await _context.SaveChangesAsync();
            return file;

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
    }
}
