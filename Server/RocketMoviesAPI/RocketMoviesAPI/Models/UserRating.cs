using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Models
{
    public class UserRating
    {
        public User User { get; set; }
        public long UserId { get; set; }
        public Movie Movie { get; set; }
        public long MovieId { get; set; }
        public int RatingValue { get; set; }
    }
}
