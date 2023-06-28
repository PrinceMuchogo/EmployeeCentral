using Microsoft.EntityFrameworkCore;
using Employee_Management_System.Models;

namespace Employee_Management_System.Data
{
    public class AppDBContext : DbContext
    {

        public AppDBContext(){

            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
        }

        private readonly IConfiguration _configuration;
        
        public AppDBContext(DbContextOptions<AppDBContext> options, IConfiguration configuration) : base(options) {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public DbSet<Employee>? Employees {get; set;}
        public DbSet<Manager>? Managers {get; set;}
        public DbSet<Task>? Tasks {get; set;}
        public DbSet<LeaveRequest>? LeaveRequests {get; set;}
        public DbSet<Admin>? Admins {get; set;}


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("employee-management"));
        }

        //outlines the modelling of the shemas in the database
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Email)
                .IsUnique();

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Manager)
                .WithMany(m => m.Employees)
                .HasForeignKey(e => e.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Salary)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Employee>()
                .Property(e => e.Performance)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Employee>()
                .HasIndex(e => e.Email)
                .IsUnique();

            modelBuilder.Entity<Manager>()
                .HasKey(m => m.Id);

            modelBuilder.Entity<Manager>()
                .HasMany(m => m.Employees)
                .WithOne(e => e.Manager)
                .HasForeignKey(e => e.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Manager>()
                .HasIndex(m => m.Email)
                .IsUnique();

            modelBuilder.Entity<Manager>()
                .Property(e => e.Salary)
                .HasColumnType("decimal(18, 2)");
            
            modelBuilder.Entity<Task>()
                .HasOne(t => t.Employee)
                .WithMany(e => e.Tasks)
                .HasForeignKey(t => t.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LeaveRequest>()
                .HasOne(l => l.Employee)
                .WithMany(e => e.LeaveRequests)
                .HasForeignKey(l => l.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict); 
                          
        }
    }
}