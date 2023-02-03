using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using FluentAssertions;
using agora.Controllers;
using agora.Data;

namespace agora.Tests
{
    public class FollowControllerTest
    {
        /* Test scenario:
            1. Anonymous user tries to follow an author but fails to do so because it requires a verification,
                (The client doesn't allow this so it would have been a direct request)
            2. The user then logs in and successfully follows the author.
            3. The user changes their mind and unfollows the author shortly after.
                - given that the controller is set up correctly, the request will return ok 200
        */
    }
}