using System;
using System.Collections.Generic;

namespace agora
{
    public partial class GetPostsDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public int? Likes { get; set; }
        public uint UserId { get; set; }
        public string Autor { get; set; } = null!;
    }
}