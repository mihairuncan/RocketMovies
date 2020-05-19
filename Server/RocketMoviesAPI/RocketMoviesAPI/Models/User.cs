using System;
using System.Collections.Generic;

namespace RocketMoviesAPI.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastLogin { get; set; }
        public List<UserRating> UserRatings { get; set; }
        public List<UserComment> UserComments { get; set; }
    }
}
