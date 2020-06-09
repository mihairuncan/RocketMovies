using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RocketMoviesAPI.DbContexts;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;

namespace RocketMoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly RocketMoviesContext _context;
        private readonly IMapper _mapper;

        public MoviesController(RocketMoviesContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovies(string searchText = null)
        {
            var result = _context.Movies as IQueryable<Movie>;
            if (searchText != null)
            {
                result = result.Where(m => m.Title.ToLower().Contains(searchText.ToLower()) ||
                                            m.PlotSummary.ToLower().Contains(searchText.ToLower()));
            }

            var moviesFromRepository = await result
                                                .Include(m => m.UserRatings)
                                                .ToListAsync();
            var moviesToReturn = _mapper.Map<IEnumerable<MovieDto>>(moviesFromRepository);
            return Ok(moviesToReturn);
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDetailViewDto>> GetMovie(long id)
        {
            var movie = await _context.Movies
                                        .Include(m => m.UserRatings)
                                        .Include(m => m.UserComments).ThenInclude(uc => uc.User)
                                        .Include(m => m.UserComments).ThenInclude(uc => uc.Comment)
                                        .Include(m => m.PersonMovieRoles).ThenInclude(pmr => pmr.Person)
                                        .Include(m => m.PersonMovieRoles).ThenInclude(pmr => pmr.Movie)
                                        .FirstOrDefaultAsync(m => m.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            var movieToReturn = _mapper.Map<MovieDetailViewDto>(movie);

            return movieToReturn;
        }

        // PUT: api/Movies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize(Roles = UserRole.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(long id, MovieDto movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            var movieEntity = _mapper.Map<Movie>(movie);

            _context.Entry(movieEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Movies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize(Roles = UserRole.Admin)]
        [HttpPost]
        public async Task<ActionResult<MovieDetailViewDto>> PostMovie(MovieForCreationDto movie)
        {
            var movieEntity = _mapper.Map<Movie>(movie);
            _context.Movies.Add(movieEntity);
            await _context.SaveChangesAsync();

            var movieToReturn = _mapper.Map<MovieDetailViewDto>(movieEntity);

            return CreatedAtAction("GetMovie", new { id = movieToReturn.Id }, movieToReturn);
        }

        // DELETE: api/Movies/5
        [Authorize(Roles = UserRole.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieDto>> DeleteMovie(long id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            var movieToReturn = _mapper.Map<MovieDto>(movie);

            return movieToReturn;
        }

        // POST: api/Movies/5/comments/1
        // Add a new Comment to a particular Movie
        [Authorize]
        [HttpPost("{movieId}/comments")]
        public async Task<ActionResult<Comment>> PostComment(long movieId, CommentForCreation commentForCreation)
        {
            long userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!MovieExists(movieId))
            {
                return BadRequest();
            }

            var comment = _mapper.Map<Comment>(commentForCreation);
            comment.AddedOn = DateTime.Now;
            comment.IsApproved = false;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            var newComment = await _context.Comments
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(c => c.Id == comment.Id);

            var userComment = new UserComment { UserId = userId, CommentId = comment.Id, MovieId = movieId };
            _context.UserComment.Add(userComment);
            await _context.SaveChangesAsync();

            var updatedMovie = await _context.Movies.FindAsync(movieId);
            updatedMovie.UserComments.Add(userComment);

            var updatedUser = await _context.Users.FindAsync(userId);
            updatedUser.UserComments.Add(userComment);

            return Ok();
        }

        // POST: add a rating to a movie or update an existing one
        [Authorize]
        [HttpPost("{movieId}/ratings")]
        public async Task<ActionResult<UserRating>> PostRating(long movieId, UserRating userRating)
        {
            if (_context.UserRating.Contains(userRating))
            {
                _context.Entry(userRating).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.UserRating.Add(userRating);

                var movie = await _context.Movies.FindAsync(movieId);
                movie.UserRatings.Add(userRating);

                var user = await _context.Users.FindAsync(userRating.UserId);
                user.UserRatings.Add(userRating);

                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        private bool MovieExists(long id)
        {
            return _context.Movies.Any(e => e.Id == id);
        }
    }
}