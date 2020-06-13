using System.Collections.Generic;

namespace RocketMoviesAPI.Models
{
    public class Movie
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string PlotSummary { get; set; }
        public long GrossTakingsAmount { get; set; }
        public bool IsAvailableOnDVD { get; set; }
        public Genre Genre { get; set; }
        public string PictureURL { get; set; }
        public List<UserRating> UserRatings { get; set; }
        public List<UserComment> UserComments { get; set; }
        public List<PersonMovieRole> PersonMovieRoles { get; set; }
        public ICollection<FavouriteMovie> FavouriteMovieForUsers { get; set; }

    }
}
