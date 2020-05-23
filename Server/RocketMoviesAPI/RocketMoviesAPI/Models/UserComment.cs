using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Models
{
    public class UserComment
    {
        public long Id { get; set; }

        public User User { get; set; }
        public long UserId { get; set; }
        
        public Movie Movie { get; set; }
        public long MovieId { get; set; }
        
        public Comment Comment { get; set; }
        public long CommentId { get; set; }
    }
}
