namespace RocketMoviesAPI.Models
{
    public class UserRating
    {
        public long Id { get; set; }
        public User User { get; set; }
        public long UserId { get; set; }
        public Movie Movie { get; set; }
        public long MovieId { get; set; }
        public int RatingValue { get; set; }
    }
}
