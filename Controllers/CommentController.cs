using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using agora;
using agora.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using agora.Models;

namespace agora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public CommentController(ForumDbContext context)
        {
            _context = context;
        }

        [HttpGet("{postId}")]
        public async Task<ActionResult<IEnumerable<GetCommentDTO>>> GetComments(int postId)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }

            return await _context
            .Comments
            .Where(c => c.PostId == postId)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new GetCommentDTO
            {
                Id = p.Id,
                Body = p.Body,
                CreatedAt = p.CreatedAt,
                Autor = p.Autor,
                PostId = p.PostId
            }).ToListAsync();
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<ActionResult<CommentDTO>> PostComment(CommentDTO comment)
        {
            if (_context.Comments == null)
            {
                return Problem("Entity set 'ForumDbContext.Comments'  is null.");
            }

            var userNickname = UserController.GetIdentityClaim(HttpContext);
            if (userNickname == null) { return Unauthorized(); }

            var newComment = new Comment { Body = comment.Body, PostId = comment.PostId, Autor = userNickname };
            _context.Comments.Add(newComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostComment", newComment);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            if (_context.Comments == null)
            {
                return NotFound();
            }
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool CommentExists(int id)
        {
            return (_context.Comments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
