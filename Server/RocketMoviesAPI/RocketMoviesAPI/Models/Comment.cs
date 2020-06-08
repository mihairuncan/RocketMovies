using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Models
{
    public class Comment
    {
        public long Id { get; set; }
        public string CommentText { get; set; }
        public DateTime AddedOn { get; set; }
        public bool IsApproved { get; set; }
    }
}
