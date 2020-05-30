using AutoMapper;
using FlowersApp.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RocketMoviesAPI.DbContexts;
using RocketMoviesAPI.Helpers;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Services
{
    public interface IUserService
    {
        UserDto Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        Task<UserDto> CreateUser(UserForCreation user);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly RocketMoviesContext _context;
        private readonly IMapper _mapper;

        public UserService(IOptions<AppSettings> appSettings, RocketMoviesContext context, IMapper mapper)
        {
            _appSettings = appSettings.Value;
            _context = context;
            _mapper = mapper;
        }

        public UserDto Authenticate(string username, string password)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == username && x.Password == HashUtils.GetHashString(password));

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            var userToReturn = _mapper.Map<UserDto>(user);
            return userToReturn;
        }

        public async Task<UserDto> CreateUser(UserForCreation user)
        {
            var userEntity = _mapper.Map<User>(user);
            _context.Users.Add(userEntity);
            await _context.SaveChangesAsync();

            var userToReturn = _mapper.Map<UserDto>(userEntity);
            return userToReturn;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList();
        }
    }
}
