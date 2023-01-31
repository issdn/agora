using System;
using System.Collections.Generic;
using agora.Models;

namespace agora.Models
{
    public partial class Like
    {
        public string UserNickname { get; set; } = null!;
        public int PostId { get; set; }
        public virtual User User { get; set; } = null!;
        public virtual Post Post { get; set; } = null!;
    }
}
