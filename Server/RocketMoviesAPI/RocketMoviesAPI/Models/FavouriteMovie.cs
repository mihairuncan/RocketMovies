using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Models
{
    public class FavouriteMovie
    {
        public long UserId { get; set; }
        public long MovieId { get; set; }
        public User User { get; set; }
        public Movie Movie { get; set; }
    }
}
