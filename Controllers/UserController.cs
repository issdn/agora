using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using agora.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using agora.Data;

namespace agora.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public UserController(ForumDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }


        [AllowAnonymous]
        [HttpGet("posts/{nickname}")]
        public async Task<ActionResult<IEnumerable<GetPostsDTO>>> GetAllUserPosts(string nickname)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }

            var currUserNickname = UserController.GetIdentityClaimNickname(HttpContext);

            return await _context
                .Posts
                .Where(p => p.Autor == nickname)
                .Select(p => new GetPostsDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    CreatedAt = p.CreatedAt,
                    Likes = p.PostLikes.Count(),
                    Autor = p.Autor,
                    UserDoesLike = p.PostLikes.Any(l => l.UserNickname == currUserNickname)
                }).ToListAsync();
        }

        [AllowAnonymous]
        [HttpGet("{nickname}")]
        public async Task<ActionResult<IEnumerable<GetUserInfoDTO>>> GetUserInfo(string nickname)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }

            var currUserNickname = UserController.GetIdentityClaimNickname(HttpContext);

            var user = await _context
                .Users
                .Where(u => u.Nickname == nickname)
                .FirstOrDefaultAsync();

            if (user == null) { return NotFound(); }

            return Ok(new GetUserInfoDTO
            {
                Nickname = user.Nickname,
                NumberOfLikes = _context.Posts.Where(p => p.Autor == user.Nickname).Sum(p => p.PostLikes.Count()),
                NumberOfFollowed = _context.Follows.Where(f => f.FollowerUserNickname == user.Nickname).Count(),
                NumberOfFollowers = _context.Follows.Where(f => f.FollowedUserNickname == user.Nickname).Count(),
                UserDoesFollow = _context.Follows.Any(f => f.FollowerUserNickname == currUserNickname),
                NumberOfPosts = _context.Posts.Where(p => p.Autor == user.Nickname).Count()
            });
        }

        // PUT: api/User/5
        [HttpPut("{nickname}")]
        public async Task<IActionResult> PutUser(string nickname, UserDTO user)
        {
            if (nickname != user.Nickname)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(nickname))
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

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public static string? GetIdentityClaimNickname(HttpContext httpContext)
        {
            var identity = httpContext.User.Identity as ClaimsIdentity;
            return identity?.FindFirst("Nickname")?.Value;

        }
        private bool UserExists(string nickname)
        {
            return (_context.Users?.Any(e => e.Nickname == nickname)).GetValueOrDefault();
        }
    }
}
