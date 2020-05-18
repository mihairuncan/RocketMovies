using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Models
{
    public class PersonMovieRole
    {
        public Person Person { get; set; }
        public long PersonId { get; set; }
        public Movie Movie { get; set; }
        public long Movieid { get; set; }
        public Role Role { get; set; }
    }
}
