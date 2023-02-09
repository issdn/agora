using System;
using System.Collections.Generic;

namespace agora
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            Posts = new HashSet<Post>();
            FollowedUserNicknames = new HashSet<User>();
            FollowerUserNicknames = new HashSet<User>();
            PostLikes = new HashSet<Like>();
        }

        public string Nickname { get; set; } = null!;
        public string Password { get; set; } = null!;

        public virtual PostDraft? PostDraft { get; set; }
        public virtual ICollection<Like> PostLikes { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<User> FollowedUserNicknames { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<User> FollowerUserNicknames { get; set; }
    }
}
