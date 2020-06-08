using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
                                            .Include(uc=>uc.Movie)
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





    }
}
