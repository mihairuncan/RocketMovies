using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ViewModels
{
    public class CommentForApprovalDto
    {
        public long Id { get; set; }
        public string Movie { get; set; }
        public string Username { get; set; }
        public string CommentText { get; set; }
        public DateTime AddedOn { get; set; }
    }
}
