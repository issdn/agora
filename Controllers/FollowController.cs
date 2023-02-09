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
            var user = await _context.Users
                .Include(u => u.FollowedUserNicknames)
                .Where(f => f.Nickname == userNickname)
                .FirstOrDefaultAsync();
            if (user == null) { return NotFound("Couldn't find an user with given nickname."); }
            return user.FollowedUserNicknames.Select(u => u.Nickname).ToArray();
        }

        [AllowAnonymous]
        [HttpGet("followers/{userNickname}")]
        public async Task<ActionResult<string[]>> GetUserFollowersByTheirNickname(string userNickname)
        {
            var user = await _context.Users
                .Include(u => u.FollowerUserNicknames)
                .Where(f => f.Nickname == userNickname)
                .FirstOrDefaultAsync();
            if (user == null) { return NotFound("Couldn't find an user with given nickname."); }
            return user.FollowerUserNicknames.Select(u => u.Nickname).ToArray();
        }

        [HttpPost("{userNickname}")]
        public async Task<ActionResult<Follow>> FollowUser(String userNickname)
        {
            var sessionUserNickname = UserController.GetIdentityClaimNickname(HttpContext);
            var currUser = await _context.Users
                .Include(u => u.FollowedUserNicknames)
                .Where(u => u.Nickname == sessionUserNickname)
                .FirstOrDefaultAsync();
            if (currUser == null) { return NotFound("You apparently don't exist."); }

            var userToFollow = await _context.Users.Where(u => u.Nickname == userNickname).FirstOrDefaultAsync();
            if (userToFollow == null)
            {
                return NotFound("User doesn't exist anymore.");
            }

            var follow = currUser.FollowedUserNicknames.Contains(userToFollow);

            if (!follow)
            {
                currUser.FollowedUserNicknames.Remove(userToFollow);
            }
            else
            {
                currUser.FollowedUserNicknames.Add(userToFollow);
            }

            await _context.SaveChangesAsync();

            return Ok("Followed!");
        }
    }
}
