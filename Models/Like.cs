using System;
using System.Collections.Generic;

namespace agora
{
    public partial class Like
    {
        public string UserNickname { get; set; } = null!;
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
        public virtual User UserNicknameNavigation { get; set; } = null!;
    }
}
