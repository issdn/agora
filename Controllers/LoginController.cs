using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using agora.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using agora.Data;

namespace agora.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public LoginController(ForumDbContext context)
        {
            _context = context;

        }

        [HttpPost("login")]
        public IActionResult Login(UserDTO user)
        {
            if (user is null)
            {
                return BadRequest("Invalid client request");
            }

            PasswordHasher<User> hasher = new PasswordHasher<User>();

            var userObj = _context.Users.Where(u => u.Nickname.Equals(user.Nickname)).FirstOrDefault();
            if (userObj != null)
            {
                PasswordVerificationResult passresult = hasher.VerifyHashedPassword(userObj, userObj.Password, user.Password);
                if (passresult == 0)
                {
                    return Forbid();
                }
                var secretKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("randomasskeyhahahahahahahahahahaha"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:7065",
                    audience: "https://localhost:7065",
                    claims: new List<Claim>{
                        new Claim("nickname", userObj.Nickname),
                    },
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return CreatedAtAction("Login", new AuthenticatedResponse { Token = tokenString, Nickname = userObj.Nickname });
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {

            if (_context.Users == null)
            {
                return Problem("Entity set 'UserDbContext.User' is null.");
            }

            if (_context.Users.Any(u => u.Nickname == user.Nickname) == true)
            {
                return Forbid();
            }

            PasswordHasher<User> hasher = new PasswordHasher<User>();
            String password = hasher.HashPassword(user, user.Password);
            user.Password = password;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Register", user);
        }
    }
}