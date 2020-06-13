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
        public DbSet<FavouriteMovie> FavouriteMovies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<FavouriteMovie>()
               .HasKey(fv => new { fv.UserId,fv.MovieId});

            modelBuilder.Entity<FavouriteMovie>()
                .HasOne(fv => fv.User)
                .WithMany(fv => fv.FavouriteMovies)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FavouriteMovie>()
                .HasOne(fv => fv.Movie)
                .WithMany(fv => fv.FavouriteMovieForUsers)
                .HasForeignKey(u => u.MovieId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<Comment>().HasQueryFilter(c => c.IsApproved);

        }
    }
}
