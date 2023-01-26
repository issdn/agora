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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetPostsDTO>>> GetPosts()
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            return await _context
            .Posts
            .OrderByDescending(p => p.CreatedAt)
            .Take(10)
            .Select(p => new GetPostsDTO
            {
                Id = p.Id,
                Title = p.Title,
                CreatedAt = p.CreatedAt,
                Likes = p.Likes,
                UserId = p.UserId,
                UserNickname = p.UserNickname
            }).ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostsByUserId(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            return await _context.Posts.Where(u => u.UserId == id).ToListAsync();
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
            if (identity == null)
            {
                return Unauthorized();
            }

            var userId = identity.FindFirst("Id")?.Value;
            var userNickname = identity.FindFirst("Nickname")?.Value;
            if (userNickname == null) { return Problem("Server error. identity.Nickname is null."); };
            Post newPost = new Post();
            newPost.Body = post.Body;
            newPost.Title = post.Title;
            newPost.UserId = Convert.ToUInt32(userId);
            newPost.UserNickname = userNickname;
            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();
            return CreatedAtAction("CreatePost", post);
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("draft/save")]
        public async Task<ActionResult<PostDraftDTO>> SaveDraft(PostDraftDTO postDraft)
        {
            if (_context.PostDrafts == null || _context.Users == null)
            {
                return Problem("Users or PostsDraft database is empty.");
            }

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return Unauthorized();
            }

            var userId = identity.FindFirst("Id")?.Value;

            var draft = _context.PostDrafts.Where(d => d.UserId.ToString() == userId).FirstOrDefault();
            if (draft != null)
            {
                draft.Body = postDraft.Body;
                draft.Title = postDraft.Title;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return Problem("Server error.");
            }
        }
    }
}
