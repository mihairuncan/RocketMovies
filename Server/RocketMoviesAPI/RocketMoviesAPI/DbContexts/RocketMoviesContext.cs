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
    }
}
