using Microsoft.EntityFrameworkCore;
using RocketMoviesAPI.Models;

namespace RocketMoviesAPI.DbContexts
{
    public class RocketMoviesContext : DbContext
    {
        public RocketMoviesContext(DbContextOptions<RocketMoviesContext> options)
            : base(options)
        { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserComment> UserComment { get; set; }
        public DbSet<UserRating> UserRating { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<Comment>().HasQueryFilter(c => c.IsApproved);

        }
    }
}
