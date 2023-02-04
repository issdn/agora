using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using agora.Data;
using agora.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace agora.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public FollowController(ForumDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("follows/{userNickname}")]
        public async Task<ActionResult<string[]>> GetUserFollowsByTheirNickname(string userNickname)
        {
            if (_context.Follows == null)
            {
                return NotFound();
            }

            var user = await _context.Users.Where(u => u.Nickname == userNickname).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }
            return await _context.Follows.Where(f => f.FollowerUserNickname == userNickname).Select(u => u.FollowedUserNickname).ToArrayAsync();
        }

        [AllowAnonymous]
        [HttpGet("followers/{userNickname}")]
        public async Task<ActionResult<string[]>> GetUserFollowersByTheirNickname(string userNickname)
        {
            if (_context.Follows == null)
            {
                return NotFound();
            }

            var user = await _context.Users.Where(u => u.Nickname == userNickname).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return await _context.Follows.Where(f => f.FollowedUserNickname == userNickname).Select(u => u.FollowerUserNickname).ToArrayAsync();
        }

        [HttpPost("{userNickname}")]
        public async Task<ActionResult<Follow>> FollowUser(String userNickname)
        {
            if (_context.Follows == null)
            {
                return Problem("Entity set 'ForumDbContext.Follows' is null.");
            }
            var sessionUserNickname = UserController.GetIdentityClaimNickname(HttpContext);
            if (sessionUserNickname == null) { return Unauthorized(); }

            if (sessionUserNickname == userNickname) { return BadRequest(); }

            var probablyExistingFollow = await _context.Follows
            .Where(f => f.FollowedUserNickname == userNickname && f.FollowerUserNickname == sessionUserNickname)
            .FirstOrDefaultAsync();

            if (probablyExistingFollow != null)
            {
                _context.Follows.Remove(probablyExistingFollow);
            }
            else
            {
                var follow = new Follow { FollowerUserNickname = sessionUserNickname, FollowedUserNickname = userNickname };
                _context.Follows.Add(follow);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{userNickname}")]
        public async Task<IActionResult> Unfollow(string userNickname)
        {
            if (_context.Follows == null)
            {
                return NotFound();
            }

            var sessionUserNickname = UserController.GetIdentityClaimNickname(HttpContext);
            if (sessionUserNickname == null) { return Unauthorized(); }

            var follow = await _context.Follows.Where(f => f.FollowedUserNickname == sessionUserNickname).FirstOrDefaultAsync();
            if (follow == null)
            {
                return NotFound();
            }

            _context.Follows.Remove(follow);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool FollowExists(string FollowerUserNickname, string FollowedUserNickname)
        {
            return (_context.Follows?.Any(e =>
                (e.FollowerUserNickname == FollowerUserNickname && e.FollowedUserNickname == FollowedUserNickname)))
                .GetValueOrDefault();
        }
    }
}
