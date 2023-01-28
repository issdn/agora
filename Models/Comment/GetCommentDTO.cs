using System;
using System.Collections.Generic;

namespace agora
{
    public partial class GetCommentDTO
    {
        public int Id { get; set; }
        public string Body { get; set; } = null!;
        public string Autor { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public int PostId { get; set; }
    }
}
