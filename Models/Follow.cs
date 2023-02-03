using System;
using System.Collections.Generic;
using agora.Models;

namespace agora.Models
{
    public partial class Follow
    {
        public string FollowerUserNickname { get; set; } = null!;
        public string FollowedUserNickname { get; set; } = null!;
        public virtual User FollowedUser { get; set; } = null!;
        public virtual User FollowerUser { get; set; } = null!;
    }
}
