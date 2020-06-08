using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ViewModels
{
    public class CommentForUpdate
    {
        public long Id { get; set; }
        public string CommentText { get; set; }
    }
}
