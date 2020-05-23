using RocketMoviesAPI.Models;
using System.Collections.Generic;

namespace RocketMoviesAPI.ViewModels
{
    public class MovieDetailViewDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string PlotSummary { get; set; }
        public long GrossTakingsAmount { get; set; }
        public bool IsAvailableOnDVD { get; set; }
        public string Genre { get; set; }
        public string PictureURL { get; set; }
        public decimal Rating { get; set; }
        public List<CommentDto> UserComments { get; set; }
        public List<PersonRoleDto> PersonRoles { get; set; }
    }
}
