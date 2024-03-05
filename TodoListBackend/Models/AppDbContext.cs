using Microsoft.EntityFrameworkCore;
using TodoListApi.Models;

namespace TodoListApi.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
