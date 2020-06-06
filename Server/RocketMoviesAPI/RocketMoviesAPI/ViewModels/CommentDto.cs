using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RocketMoviesAPI.Models;

namespace RocketMoviesAPI.ViewModels
{
    public class CommentDto
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string CommentText { get; set; }
        public DateTime AddedOn { get; set; }
        public long CommentId { get; set; }
    }
}
