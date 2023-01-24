using System;
using System.Collections.Generic;
using agora.Models;

namespace agora
{
    public partial class User
    {
        public User()
        {
            Posts = new HashSet<Post>();
        }

        public uint Id { get; set; }
        public string Nickname { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int? Reputation { get; set; }

        public virtual PostDraft? PostDraft { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
