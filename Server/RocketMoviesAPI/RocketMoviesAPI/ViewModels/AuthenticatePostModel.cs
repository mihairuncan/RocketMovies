using System.ComponentModel.DataAnnotations;

namespace RocketMoviesAPI.ViewModels
{
    public class AuthenticatePostModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
