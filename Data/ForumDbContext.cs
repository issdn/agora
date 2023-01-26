using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
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

        public virtual DbSet<PostDraft> PostDrafts { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
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
                entity.HasKey(e => new { e.Id, e.UserId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("comment");

                entity.HasIndex(e => e.UserId, "fk_comments_user_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Body)
                    .HasColumnType("mediumtext")
                    .HasColumnName("body");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_comments_user");

                entity.HasMany(d => d.Posts)
                    .WithMany(p => p.Comments)
                    .UsingEntity<Dictionary<string, object>>(
                        "PostComment",
                        l => l.HasOne<Post>().WithMany().HasForeignKey("PostId", "PostUserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("fk_post_comment_post"),
                        r => r.HasOne<Comment>().WithMany().HasForeignKey("CommentsId", "CommentsUserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("fk_post_comment_comment"),
                        j =>
                        {
                            j.HasKey("CommentsId", "CommentsUserId", "PostId", "PostUserId").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0, 0 });

                            j.ToTable("post_comment");

                            j.HasIndex(new[] { "PostId", "PostUserId" }, "fk_post_commen_comment_idx");

                            j.HasIndex(new[] { "CommentsId", "CommentsUserId" }, "fk_post_comment_post_idx");

                            j.IndexerProperty<int>("CommentsId").HasColumnName("comments_id");

                            j.IndexerProperty<uint>("CommentsUserId").HasColumnName("comments_user_id");

                            j.IndexerProperty<int>("PostId").HasColumnName("post_id");

                            j.IndexerProperty<uint>("PostUserId").HasColumnName("post_user_id");
                        });
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.UserId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("post");

                entity.HasIndex(e => new { e.UserId, e.UserNickname }, "fk_post_user_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Body)
                    .HasColumnType("mediumtext")
                    .HasColumnName("body");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Likes)
                    .HasColumnName("likes")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Title)
                    .HasColumnType("tinytext")
                    .HasColumnName("title");

                entity.Property(e => e.UserNickname)
                    .HasMaxLength(32)
                    .HasColumnName("user_nickname");

            });

            modelBuilder.Entity<PostDraft>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PRIMARY");

                entity.ToTable("post_draft");

                entity.HasIndex(e => e.UserId, "fk_post_draft_user_idx")
                    .IsUnique();

                entity.Property(e => e.UserId)
                    .ValueGeneratedNever()
                    .HasColumnName("user_id");

                entity.Property(e => e.Body)
                    .HasColumnType("mediumtext")
                    .HasColumnName("body");

                entity.Property(e => e.Title)
                    .HasColumnType("tinytext")
                    .HasColumnName("title");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.PostDraft)
                    .HasForeignKey<PostDraft>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_post_draft_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.Nickname, "nickname_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(254)
                    .HasColumnName("email");

                entity.Property(e => e.Nickname)
                    .HasMaxLength(32)
                    .HasColumnName("nickname");

                entity.Property(e => e.Password)
                    .HasMaxLength(128)
                    .HasColumnName("password");

                entity.Property(e => e.Reputation)
                    .HasColumnName("reputation")
                    .HasDefaultValueSql("'0'");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
