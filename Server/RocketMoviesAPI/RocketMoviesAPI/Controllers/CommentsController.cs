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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly RocketMoviesContext _context;
        private readonly IMapper _mapper;

        public CommentsController(RocketMoviesContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //[Authorize(Roles = $"{UserRole.Admin},{UserRole.Moderator}")]
        [Authorize(Roles = "Admin,Moderator")]
        [HttpGet]
        public async Task<IActionResult> GetUnapprovedComments()
        {
            var userComments = await _context.UserComment
                                            .Include(uc => uc.Comment)
                                            .Include(uc => uc.User)
                                            .Include(uc => uc.Movie)
                                            .IgnoreQueryFilters()
                                            .Where(uc => uc.Comment.IsApproved == false)
                                            .OrderByDescending(uc => uc.Comment.AddedOn)
                                            .ToListAsync();

            var comments = _mapper.Map<IEnumerable<CommentForApprovalDto>>(userComments);

            return Ok(comments);
        }

        [Authorize(Roles = "Admin,Moderator")]
        [HttpPost("approve/{id}")]
        public async Task<IActionResult> ApproveComment(long id)
        {
            var comment = await _context.Comments
                                    .IgnoreQueryFilters()
                                    .FirstOrDefaultAsync(c => c.Id == id && c.IsApproved == false);

            if (comment == null)
            {
                BadRequest();
            }

            comment.IsApproved = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Admin,Moderator")]
        [HttpPost("reject/{id}")]
        public async Task<IActionResult> RejectComment(long id)
        {
            var comment = await _context.Comments
                                    .IgnoreQueryFilters()
                                    .FirstOrDefaultAsync(c => c.Id == id && c.IsApproved == false);

            if (comment == null)
            {
                return NotFound();
            }

            var userComment = await _context.UserComment.FirstOrDefaultAsync(uc => uc.CommentId == id);
            if (userComment != null)
            {
                _context.UserComment.Remove(userComment);
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{commentId}")]
        public async Task<ActionResult<Comment>> PutComment(long commentId, CommentForUpdate commentForUpdate)
        {


            // Authorize: check if user submitting is the same as author of the comment
            UserComment userComment = await _context.UserComment.FirstOrDefaultAsync(uc => uc.CommentId == commentId);
            if(userComment == null)
            {
                return BadRequest();
            }
            if (userComment.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if (commentId != commentForUpdate.Id)
            {
                return BadRequest();
            }

            if (!CommentExists(commentId))
            {
                return NotFound();
            }

            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);

            comment.CommentText = commentForUpdate.CommentText;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{commentId}")]
        public async Task<ActionResult<Comment>> DeleteComment(long commentId)
        {
            if (!CommentExists(commentId))
            {
                return NotFound();
            }

            UserComment userComment = await _context.UserComment.FirstOrDefaultAsync(uc => uc.CommentId == commentId);
            if (userComment.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);

            _context.UserComment.Remove(userComment);
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return Ok();
        }


        private bool CommentExists(long id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }


    }
}
