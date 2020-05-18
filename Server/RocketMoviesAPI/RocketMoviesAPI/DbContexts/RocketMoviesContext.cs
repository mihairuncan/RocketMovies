using Microsoft.EntityFrameworkCore;
using RocketMoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.DbContexts
{
    public class RocketMoviesContext :DbContext
    {
        public RocketMoviesContext(DbContextOptions<RocketMoviesContext> options)
            : base(options)
        { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Comment>Comments { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
