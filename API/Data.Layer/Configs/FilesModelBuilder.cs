using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HM.ProductCase.Infrastructure.Config;

public class FilesModelBuilder : IEntityTypeConfiguration<Files>
{
  public void Configure(EntityTypeBuilder<Files> builder)
  {
    builder.HasKey(i => i.Id ).HasName("PrimaryKey_FileId");
  }
}