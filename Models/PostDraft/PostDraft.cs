using System;
using System.Collections.Generic;

namespace agora
{
    public partial class PostDraft
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
        public uint UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
