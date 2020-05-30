using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RocketMoviesAPI.Services;
using RocketMoviesAPI.ViewModels;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticatePostModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostUser(UserForCreation user)
        {
            if (_userService.UsernameExists(user.Username))
            {
                return BadRequest("Username already taken");
            }

            var userToReturn = await _userService.CreateUser(user);
            if(userToReturn == null)
            {
                return BadRequest("Some error occured");
            }
            return Ok(userToReturn);
        }
    }
}