using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FileController : Controller
    {
        private IFilesService _service;
        public FileController(IFilesService service)
        {
            _service = service;
        }
    }
}
