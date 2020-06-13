using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
        Task<User> Authenticate(string username, string password);
        Task<IEnumerable<User>> GetAll();
        Task<User> GetUserById(long id);
        Task<User> GetUserByUsernameAndEmail(string username, string email);
        Task<User> Register(User user);
        bool UsernameExists(string username);
        Task<bool> SaveAll();
        Task<IEnumerable<Movie>> GetFavouriteMovies(long userId);

    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly RocketMoviesContext _context;

        public UserService(IOptions<AppSettings> appSettings, RocketMoviesContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Username == username && x.Password == HashUtils.GetHashString(password));

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
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.UserRole)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public async Task<User> Register(User user)
        {
            await _context.Users.AddAsync(user);

            return user;
        }

        public bool UsernameExists(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username) != null;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<User> GetUserById(long id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByUsernameAndEmail(string username, string email)
        {
            return await _context.Users
                                .FirstOrDefaultAsync(u => u.Username == username && u.Email == email);
        }

        public async Task<IEnumerable<Movie>> GetFavouriteMovies(long userId)
        {
            var favouriteMovies = await _context.FavouriteMovies
                                                .Include(fv => fv.Movie)
                                                .ThenInclude(m => m.UserRatings)
                                                .Where(fv => fv.UserId == userId)
                                                .Select(fv => fv.Movie)
                                                .ToListAsync();
            return favouriteMovies;
        }


        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
