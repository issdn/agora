using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using agora.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace agora.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserDbContext _context;

        public LoginController(UserDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(UserLogin user)
        {   
            if (user is null)
            {
                return BadRequest("Invalid client request");
            }

            var userObj = _context.User.Where(u => u.Nickname.Equals(user.Nickname) && u.Password.Equals(user.Password)).FirstOrDefault();
            if (userObj != null){
                var secretKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("randomasskeyhahahahahahahahahahaha"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:7065",
                    audience: "https://localhost:7065",
                    claims: new List<Claim>{
                        new Claim("id", userObj.Id.ToString()),
                        new Claim("nickname", userObj.Nickname),
                    },
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new AuthenticatedResponse { Token = tokenString });
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
          if (_context.User == null)
          {
              return Problem("Entity set 'UserDbContext.User'  is null.");
          }
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }
    }
}