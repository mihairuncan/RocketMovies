using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.Services;
using RocketMoviesAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticatePostModel model)
        {
            var user = await _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var userToReturn = _mapper.Map<UserWithToken>(user);

            return Ok(userToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAll();

            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(long id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await _userService.GetUser(id);
            var result = _mapper.Map<UserDto>(user);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdate userForUpdate)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if (_userService.UsernameExists(userForUpdate.Username))
            {
                return BadRequest("Username already taken");
            }


            var userFromRepo = await _userService.GetUser(id);

            _mapper.Map(userForUpdate, userFromRepo);

            if (await _userService.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating user {id} failed on save");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register(UserForCreation user)
        {
            if (_userService.UsernameExists(user.Username))
            {
                return BadRequest("Username already taken");
            }

            var userEntity = _mapper.Map<User>(user);

            await _userService.Register(userEntity);

            if (await _userService.SaveAll())
            {
                var userToReturn = _mapper.Map<UserWithToken>(userEntity);

                return Ok(userToReturn);
            }

            return BadRequest("Could not register the user");
        }
    }
}