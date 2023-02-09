using System;
using System.Collections.Generic;

namespace agora
{
    public partial class PostDraft
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
        public string Autor { get; set; } = null!;

        public virtual User AutorNavigation { get; set; } = null!;
    }
}
