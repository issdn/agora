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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
                var tokenString = getNewJwtToken(userObj);
                return CreatedAtAction("Login", new AuthenticatedResponse { Token = tokenString, Nickname = userObj.Nickname });
            }
            return Unauthorized();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("newpassword")]
        public async Task<IActionResult> NewPassword(ResetPasswordDTO resetPasswordData)
        {
            if (resetPasswordData is null)
            {
                return BadRequest("Invalid client request");
            }

            var currUserNickname = UserController.GetIdentityClaimNickname(HttpContext);

            var userObj = _context.Users.Where(u => u.Nickname.Equals(currUserNickname)).FirstOrDefault();
            if (userObj == null) { return Unauthorized(); }

            PasswordHasher<User> hasher = new PasswordHasher<User>();

            PasswordVerificationResult passresult = hasher.VerifyHashedPassword(userObj, userObj.Password, resetPasswordData.OldPassword);
            if (passresult == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Old password doesn't match.");
            }
            PasswordVerificationResult arePasswordsTheSame = hasher.VerifyHashedPassword(userObj, userObj.Password, resetPasswordData.NewPassword);
            if (arePasswordsTheSame == PasswordVerificationResult.Success)
            {
                return BadRequest("Your new password is the same as old.");
            }

            String password = hasher.HashPassword(userObj, resetPasswordData.NewPassword);
            userObj.Password = password;
            await _context.SaveChangesAsync();

            return Ok("Password changed.");
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

        public string getNewJwtToken(User user)
        {
            var secretKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("randomasskeyhahahahahahahahahahaha"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:7065",
                audience: "https://localhost:7065",
                claims: new List<Claim>{
                        new Claim("nickname", user.Nickname),
                },
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signinCredentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }
    }
}