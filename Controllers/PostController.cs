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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ForumDbContext _context;

        public PostController(ForumDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetPostsDTO>>> GetPosts(string? category)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }

            var currUserNickname = UserController.GetIdentityClaimNickname(HttpContext);

            if (category == "following")
            {
                if (currUserNickname == null) { NoContent(); }
                return await _context.Follows
                .Where(f => f.FollowerUserNickname == currUserNickname)
                .SelectMany(f => f.FollowedUser.Posts)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new GetPostsDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    CreatedAt = p.CreatedAt,
                    Likes = p.PostLikes.Count(),
                    Autor = p.Autor,
                    UserDoesLike = p.PostLikes.Any(l => l.UserNickname == currUserNickname)
                })
                .Take(10)
                .ToArrayAsync();
            }
            else
            {
                return await _context
                    .Posts
                    .OrderByDescending(p => p.CreatedAt)
                    .Take(10)
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

        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<GetSinglePostDTO>> GetPostById(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }

            var post = await _context.Posts.Where(u => u.Id == id).FirstOrDefaultAsync();
            if (post == null) { return NotFound(); }

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userNickname = identity?.FindFirst("nickname")?.Value;

            var userDoesLike = _context.Likes.Any(l => l.PostId == id && l.UserNickname == userNickname);
            var numberOfComments = _context.Comments.Where(u => u.PostId == id).Count();

            return new GetSinglePostDTO
            {
                Id = post.Id,
                Title = post.Title,
                Body = post.Body,
                CreatedAt = post.CreatedAt,
                Likes = _context.Likes.Where(l => l.PostId == post.Id).Count(),
                Autor = post.Autor,
                UserDoesLike = userDoesLike,
                CommentsNumber = numberOfComments
            };
        }

        [HttpPost("createpost")]
        public async Task<ActionResult<Post>> CreatePost(PostDTO post)
        {
            if (_context.Posts == null)
            {
                return Problem("Entity set 'UserDbContext.Posts' is null.");
            }

            var userNickname = UserController.GetIdentityClaimNickname(HttpContext);
            if (userNickname == null) { return Unauthorized(); };
            Post newPost = new Post();
            newPost.Body = post.Body;
            newPost.Title = post.Title;
            newPost.Autor = userNickname;
            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

        [HttpPut("edit/{id}")]
        public async Task<ActionResult<Post>> EditPost(PostDTO post, int id)
        {
            if (_context.Posts == null)
            {
                return Problem("Entity set 'UserDbContext.Posts' is null.");
            }

            var userNickname = UserController.GetIdentityClaimNickname(HttpContext);
            if (userNickname == null) { return Unauthorized(); };
            var dbPost = await _context.Posts.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (dbPost == null) { return NotFound(); }
            dbPost.Title = post.Title;
            dbPost.Body = post.Body;
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

        [HttpPost("like/{postId}")]
        public async Task<ActionResult> Like(int postId)
        {
            var post = _context.Posts.Where(p => p.Id == postId).FirstOrDefault();
            var currUserNickname = UserController.GetIdentityClaimNickname(HttpContext);
            var user = _context.Users.Where(u => u.Nickname == currUserNickname).FirstOrDefault();
            if (user == null || post == null) { return NotFound(); }
            var like = _context.Likes.Where(l => l.PostId == post.Id).Where(p => p.UserNickname == user.Nickname).FirstOrDefault();
            if (like == null)
            {
                _context.Likes.Add(new Like { UserNickname = user.Nickname, PostId = post.Id, User = user, Post = post });
                await _context.SaveChangesAsync();
                return Ok("Liked");
            }
            else
            {
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
                return StatusCode(201);
            }
        }

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

            var userNickname = identity.FindFirst("c")?.Value;

            var draft = _context.PostDrafts.Where(d => d.Autor == userNickname).FirstOrDefault();
            if (draft != null)
            {
                draft.Body = postDraft.Body;
                draft.Title = postDraft.Title;
                await _context.SaveChangesAsync();
                return StatusCode(201);
            }
            else
            {
                return Problem("Server error.");
            }
        }
    }
}
