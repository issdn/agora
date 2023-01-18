using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using agora.Models;

    public class UserDbContext : DbContext
    {
        public UserDbContext (DbContextOptions<UserDbContext> options)
            : base(options)
        {
        }

        public DbSet<agora.Models.User> User { get; set; } = default!;
    }
