using Microsoft.EntityFrameworkCore;

namespace ReactAspCrud.Controllers.Models
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employee { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=ANMOL-PC\\SQLEXPRESS;Initial Catalog=anmol;Integrated Security=True; TrustServerCertificate=True");
        }
    }
}
