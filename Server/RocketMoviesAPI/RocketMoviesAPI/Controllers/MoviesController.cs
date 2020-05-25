using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovies()
        {
            var moviesFromRepository = await _context.Movies
                                                        .Include(m => m.UserRatings)
                                                        .ToListAsync();
            var moviesToReturn = _mapper.Map<IEnumerable<MovieDto>>(moviesFromRepository);
            System.Console.WriteLine("a");
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(long id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;

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
        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(long id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return movie;
        }

        private bool MovieExists(long id)
        {
            return _context.Movies.Any(e => e.Id == id);
        }
    }
}
