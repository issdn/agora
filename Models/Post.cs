using System;
using System.Collections.Generic;

namespace agora.Models
{
    public partial class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Body { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public int? Likes { get; set; }
        public uint UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
