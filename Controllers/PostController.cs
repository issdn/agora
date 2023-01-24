using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using agora.Models;
using agora.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace agora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public PostController(ForumDbContext context)
        {
            _context = context;
        }

        // GET: api/Post
        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostsByUserId(int id)
        {
          if (_context.Posts == null)
          {
              return NotFound();
          }
            return await _context.Posts.Where(u=> u.UserId == id).ToListAsync();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("createpost")]
        public async Task<ActionResult<Post>> CreatePost(PostDTO post)
        {
          if (_context.Posts == null)
          {
              return Problem("Entity set 'UserDbContext.Posts' is null.");
          }

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if(identity == null) {
                return Unauthorized();
            }

            var userId = identity.FindFirst("Id")?.Value;
            Post newPost = new Post();
            newPost.Body = post.Body;
            newPost.Title = post.Title;
            newPost.UserId = Convert.ToUInt32(userId);
             _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();
            return CreatedAtAction("CreatePost", post);
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("draft/save")]
        public async Task<ActionResult<PostDraftDTO>> SaveDraft(PostDraftDTO postDraft)
        {
          if (_context.PostsDrafts == null || _context.Users == null)
          {
              return Problem("Users or PostsDraft database is empty.");
          }

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if(identity == null) {
                return Unauthorized();
            }

            var userId = identity.FindFirst("Id")?.Value;

            var draft = _context.PostsDrafts.Where(d => d.UserId.ToString() == userId).FirstOrDefault();
            if(draft != null) {
                draft.Body = postDraft.Body;
                draft.Title = postDraft.Title;
                await _context.SaveChangesAsync();
                return Ok();
            } else {
                return Problem("Server error.");
            }
        }
    }
}
