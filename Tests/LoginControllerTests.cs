using Xunit;
using FluentAssertions;
using agora.Controllers;
using agora.Data;
using agora.Models;
using Microsoft.AspNetCore.Mvc;

namespace agora.Tests
{
    public class LoginControllerTests
    {
        [Fact]
        public void POST_Login_OkResponse()
        {
            LoginController api = new LoginController(new ForumDbContext());
            var response = api.Login(new UserDTO { Nickname = "admin927", Password = "admin927" });
            Assert.True(response.GetType() == typeof(OkObjectResult), $"Expected OkObjectResult, got {response.GetType()}");
        }

        [Fact]
        public void POST_Login_Unauthorized()
        {
            LoginController api = new LoginController(new ForumDbContext());
            var response = api.Login(new UserDTO { Nickname = "", Password = "" });
            Assert.True(response.GetType() == typeof(UnauthorizedResult), $"Expected UnauthorizedResult, got {response.GetType()}");
        }
    }
}