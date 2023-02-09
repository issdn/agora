using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata;

namespace agora.Data
{
    public partial class ForumDbContext : DbContext
    {
        public ForumDbContext()
        {
        }

        public ForumDbContext(DbContextOptions<ForumDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Like> Likes { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<PostDraft> PostDrafts { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;user=root;password=root;database=forum", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comment");

                entity.HasIndex(e => e.PostId, "fk_comments_post_idx");

                entity.HasIndex(e => e.Autor, "fk_comments_user_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Autor)
                    .HasMaxLength(32)
                    .HasColumnName("autor");

                entity.Property(e => e.Body)
                    .HasColumnType("mediumtext")
                    .HasColumnName("body");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.HasOne(d => d.AutorNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.Autor)
                    .HasConstraintName("fk_comments_autor");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("fk_comments_post");
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasKey(e => e.PostId)
                .HasName("PRIMARY");

                entity.HasKey(e => e.UserNickname)
                .HasName("PRIMARY");

                entity.ToTable("like");

                entity.HasIndex(e => e.PostId, "fk_user_has_post_post1_idx");

                entity.HasIndex(e => e.UserNickname, "fk_user_has_post_user1_idx");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.UserNickname)
                    .HasMaxLength(32)
                    .HasColumnName("user_nickname");

                entity.HasOne(d => d.UserNicknameNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.UserNickname)
                    .HasConstraintName("fk_liking_user");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.PostLikes)
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("fk_liked_post");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("post");

                entity.HasIndex(e => e.Autor, "fk_post_user_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Autor)
                    .HasMaxLength(32)
                    .HasColumnName("autor");

                entity.Property(e => e.Body)
                    .HasColumnType("mediumtext")
                    .HasColumnName("body");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Title)
                    .HasColumnType("tinytext")
                    .HasColumnName("title");

                entity.HasOne(d => d.AutorNavigation)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.Autor)
                    .HasConstraintName("fk_post_autor");
            });

            modelBuilder.Entity<PostDraft>(entity =>
            {
                entity.HasKey(e => e.Autor)
                    .HasName("PRIMARY");

                entity.ToTable("post_draft");

                entity.HasIndex(e => e.Autor, "fk_post_draft_user_idx")
                    .IsUnique();

                entity.Property(e => e.Autor)
                    .HasMaxLength(32)
                    .HasColumnName("autor");

                entity.Property(e => e.Body)
                    .HasColumnType("mediumtext")
                    .HasColumnName("body");

                entity.Property(e => e.Title)
                    .HasColumnType("tinytext")
                    .HasColumnName("title");

                entity.HasOne(d => d.AutorNavigation)
                    .WithOne(p => p.PostDraft)
                    .HasForeignKey<PostDraft>(d => d.Autor)
                    .HasConstraintName("fk_post_draft_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Nickname)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.Nickname, "nickname_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Nickname)
                    .HasMaxLength(32)
                    .HasColumnName("nickname");

                entity.Property(e => e.Password)
                    .HasMaxLength(128)
                    .HasColumnName("password");

                entity.HasMany(d => d.FollowedUserNicknames)
                    .WithMany(p => p.FollowerUserNicknames)
                    .UsingEntity<Dictionary<string, object>>(
                        "Follow",
                        l => l.HasOne<User>().WithMany().HasForeignKey("FollowedUserNickname").HasConstraintName("fk_followed_user_nickname"),
                        r => r.HasOne<User>().WithMany().HasForeignKey("FollowerUserNickname").HasConstraintName("fk_follower_user_nickname"),
                        j =>
                        {
                            j.HasKey("FollowerUserNickname", "FollowedUserNickname").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                            j.ToTable("follow");
                            j.HasIndex(new[] { "FollowedUserNickname" }, "fk_followed_user_nickname_idx");
                            j.IndexerProperty<string>("FollowerUserNickname").HasMaxLength(32).HasColumnName("follower_user_nickname");
                            j.IndexerProperty<string>("FollowedUserNickname").HasMaxLength(32).HasColumnName("followed_user_nickname");
                        });

                entity.HasMany(d => d.FollowerUserNicknames)
                    .WithMany(p => p.FollowedUserNicknames)
                    .UsingEntity<Dictionary<string, object>>(
                        "Follow",
                        l => l.HasOne<User>().WithMany().HasForeignKey("FollowerUserNickname").HasConstraintName("fk_follower_user_nickname"),
                        r => r.HasOne<User>().WithMany().HasForeignKey("FollowedUserNickname").HasConstraintName("fk_followed_user_nickname"),
                        j =>
                        {
                            j.HasKey("FollowerUserNickname", "FollowedUserNickname").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                            j.ToTable("follow");
                            j.HasIndex(new[] { "FollowedUserNickname" }, "fk_followed_user_nickname_idx");
                            j.IndexerProperty<string>("FollowerUserNickname").HasMaxLength(32).HasColumnName("follower_user_nickname");
                            j.IndexerProperty<string>("FollowedUserNickname").HasMaxLength(32).HasColumnName("followed_user_nickname");
                        });
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
