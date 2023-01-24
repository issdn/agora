using System;
using System.Collections.Generic;

namespace agora.Models
{
    public partial class PostDraft
    {
        public string? Title { get; set; } = null!;
        public string? Body { get; set; } = null!;
        public uint UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
