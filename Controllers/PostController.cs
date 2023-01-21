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
        [HttpPost("addpost")]
        public async Task<ActionResult<Post>> AddPost(NewPost post)
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

            await _context.SaveChangesAsync();
            return CreatedAtAction("AddPost", post);
        }
    }
}
