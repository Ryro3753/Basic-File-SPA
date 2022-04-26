using HM.ProductCase.Infrastructure.Config;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Files> Files { get; set; }
    public string DbPath { get; }

    public AppDbContext()
    {
        var parent = Directory.GetParent(Directory.GetCurrentDirectory()); //I'm saving database to API folder since its common to all 3 project
        DbPath = Path.Join(parent.FullName, "file.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new FilesModelBuilder());
    }
}
