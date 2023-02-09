using System;
using System.Collections.Generic;

namespace agora
{
    public partial class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; } = null!;
        public string Autor { get; set; } = null!;
        public int PostId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User AutorNavigation { get; set; } = null!;
        public virtual Post Post { get; set; } = null!;
    }
}
