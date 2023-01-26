using System;
using System.Collections.Generic;

namespace agora
{
    public partial class Comment
    {
        public Comment()
        {
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }
        public string Body { get; set; } = null!;
        public uint UserId { get; set; }

        public virtual User User { get; set; } = null!;

        public virtual ICollection<Post> Posts { get; set; }
    }
}
