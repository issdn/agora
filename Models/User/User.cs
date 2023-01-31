using System;
using System.Collections.Generic;
using agora.Models;

namespace agora.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            Posts = new HashSet<Post>();
            PostLikes = new HashSet<Like>();
        }

        public string Nickname { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public virtual PostDraft? PostDraft { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> PostLikes { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
