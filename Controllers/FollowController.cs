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

        [HttpGet("{userNickname}")]
        public async Task<ActionResult<ICollection<Follow>>> GetUserFollowsByTheirNickname(string userNickname)
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

            return Ok(user.Followed.ToList());
        }

        [HttpPost]
        public async Task<ActionResult<Follow>> FollowUser(String userNickname)
        {
            if (_context.Follows == null)
            {
                return Problem("Entity set 'ForumDbContext.Follows'  is null.");
            }
            var serssionUserNickname = UserController.GetIdentityClaimNickname(HttpContext);
            if (serssionUserNickname == null) { return Unauthorized(); }

            var follow = new Follow { FollowerUserNickname = serssionUserNickname, FollowedUserNickname = userNickname };
            _context.Follows.Add(follow);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FollowExists(serssionUserNickname, userNickname))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("FollowUser", follow);
        }

        [HttpDelete("{userNickname}")]
        public async Task<IActionResult> Unfollow(string userNickname)
        {
            if (_context.Follows == null)
            {
                return NotFound();
            }

            var serssionUserNickname = UserController.GetIdentityClaimNickname(HttpContext);
            if (serssionUserNickname == null) { return Unauthorized(); }

            var follow = await _context.Follows.Where(f => f.FollowedUserNickname == serssionUserNickname).FirstOrDefaultAsync();
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
