﻿using System;
using System.Collections.Generic;

namespace agora.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Nickname { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int? Reputation { get; set; } = 0;
    }
}
