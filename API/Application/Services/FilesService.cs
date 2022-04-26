namespace Application.Services
{
    public class FilesService : IFilesService
    {
        private AppDbContext _context;
        public FilesService(AppDbContext context)
        {
            _context = context;
        }
    }
}
