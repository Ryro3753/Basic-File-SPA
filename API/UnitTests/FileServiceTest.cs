using Application.Services;
using EntityFrameworkCoreMock;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace FileServiceTest
{
    public class FileServiceTest
    {
        public DbContextOptions<AppDbContext> DummyOptions { get; } = new DbContextOptionsBuilder<AppDbContext>().Options;
        List<Files> initialValues = new List<Files>()
       {
        new Files
        {
            Id = new Guid("A04B97BB-36A7-4DB0-838E-FF6124E57E14"),
            CreatedDate = DateTime.Now,
            ModifiedDate = DateTime.Now,
            Length = 1000,
            FileType = ".xlsx",
            Name = "ExampleExcel.xlsx"
        },
        new Files
        {
            Id = new Guid("A5BD9EEE-50CD-4A98-AF13-2D410C09DABB"),
            CreatedDate = DateTime.Now,
            ModifiedDate = DateTime.Now,
            Length = 2000,
            FileType = ".png",
            Name = "ExamplePic.png"
        },
        new Files
        {
            Id = new Guid("477762CA-A1EA-4B2C-BE71-09343333E101"),
            CreatedDate = DateTime.Now,
            ModifiedDate = DateTime.Now,
            Length = 3000,
            FileType = ".txt",
            Name = "ExampleNote.txt"
        } };

        [Fact]
        public void GetFiles_OK()
        {
            var dbContextMock = new DbContextMock<AppDbContext>(DummyOptions);
            var filesDbSetMock = dbContextMock.CreateDbSetMock(x => x.Files, initialValues);

            var fileService = new FilesService(dbContextMock.Object);

            var files = fileService.GetFiles();

            Assert.IsType<List<Files>>(files.ToList());
        }


        [Fact]
        public void GetFilesType_OK()
        {
            var dbContextMock = new DbContextMock<AppDbContext>(DummyOptions);
            var filesDbSetMock = dbContextMock.CreateDbSetMock(x => x.Files, initialValues);


            var fileService = new FilesService(dbContextMock.Object);

            var types = fileService.GetFilesType().ToList();

            var seedTypes = initialValues.Select(i => new FileType
            {
                Type = i.FileType,
                Count = 1
            }).ToList();
            for (int i = 0; i < seedTypes.Count; i++)
            {
                Assert.Equal(seedTypes[i].Type, types[i].Type);
                Assert.Equal(seedTypes[i].Count, types[i].Count);
            }
        }

        [Fact]
        public async Task InsertFile_Exception()
        {
            var dbContextMock = new DbContextMock<AppDbContext>(DummyOptions);
            var filesDbSetMock = dbContextMock.CreateDbSetMock(x => x.Files, initialValues);

            var fileService = new FilesService(dbContextMock.Object);

            await Assert.ThrowsAsync<FileTypeException>(async () =>
           {
               await fileService.InsertFile(new Files
               {
                   CreatedDate = DateTime.Now,
                   FileType = ".example",
                   Id = Guid.NewGuid(),
                   Length = 1,
                   ModifiedDate = DateTime.Now,
                   Name = "Example.txt"
               });
           });

        }
    }
}