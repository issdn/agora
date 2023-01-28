using System;
using System.Collections.Generic;

namespace agora.Models
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Body { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public int? Likes { get; set; }
        public string Autor { get; set; } = null!;

        public virtual User AutorNavigation { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
