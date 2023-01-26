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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/postdraft")]
    [ApiController]
    public class DraftController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public DraftController(ForumDbContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<PostDraft>> GetDraft()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return Unauthorized();
            }
            var userId = Convert.ToUInt32(identity.FindFirst("Id")?.Value);
            var databaseDraft = _context.PostDrafts.Where(d => d.UserId == userId).FirstOrDefault();
            if (databaseDraft == null)
            {
                databaseDraft = _context.PostDrafts.Add(new PostDraft { Title = "", Body = "", UserId = userId }).Entity;
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetDraft", databaseDraft);
            }
            else
            {
                return CreatedAtAction("GetDraft", databaseDraft);
            }
        }

        [HttpPut]
        public async Task<IActionResult> SaveDraft(PostDraftDTO draft)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return Unauthorized();
            }
            var userId = Convert.ToUInt32(identity.FindFirst("Id")?.Value);
            var databaseDraft = _context.PostDrafts.Where(d => d.UserId == userId).FirstOrDefault();
            if (databaseDraft == null) { return NotFound(); }
            databaseDraft.Title = draft.Title;
            databaseDraft.Body = draft.Body;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}