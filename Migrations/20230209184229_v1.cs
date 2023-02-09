using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace agora.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    nickname = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    password = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.nickname);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "follow",
                columns: table => new
                {
                    follower_user_nickname = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    followed_user_nickname = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.follower_user_nickname, x.followed_user_nickname })
                        .Annotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                    table.ForeignKey(
                        name: "fk_followed_user_nickname",
                        column: x => x.followed_user_nickname,
                        principalTable: "user",
                        principalColumn: "nickname",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_follower_user_nickname",
                        column: x => x.follower_user_nickname,
                        principalTable: "user",
                        principalColumn: "nickname",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "post",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    title = table.Column<string>(type: "tinytext", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    body = table.Column<string>(type: "mediumtext", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    autor = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_post", x => x.id);
                    table.ForeignKey(
                        name: "fk_post_autor",
                        column: x => x.autor,
                        principalTable: "user",
                        principalColumn: "nickname",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "post_draft",
                columns: table => new
                {
                    autor = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    title = table.Column<string>(type: "tinytext", nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    body = table.Column<string>(type: "mediumtext", nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.autor);
                    table.ForeignKey(
                        name: "fk_post_draft_user",
                        column: x => x.autor,
                        principalTable: "user",
                        principalColumn: "nickname",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "comment",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    body = table.Column<string>(type: "mediumtext", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    autor = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    post_id = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comment", x => x.id);
                    table.ForeignKey(
                        name: "fk_comments_autor",
                        column: x => x.autor,
                        principalTable: "user",
                        principalColumn: "nickname",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_comments_post",
                        column: x => x.post_id,
                        principalTable: "post",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "like",
                columns: table => new
                {
                    user_nickname = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    post_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.user_nickname);
                    table.ForeignKey(
                        name: "fk_liked_post",
                        column: x => x.post_id,
                        principalTable: "post",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_liking_user",
                        column: x => x.user_nickname,
                        principalTable: "user",
                        principalColumn: "nickname",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateIndex(
                name: "fk_comments_post_idx",
                table: "comment",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "fk_comments_user_idx",
                table: "comment",
                column: "autor");

            migrationBuilder.CreateIndex(
                name: "id_UNIQUE",
                table: "comment",
                column: "id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "fk_followed_user_nickname_idx",
                table: "follow",
                column: "followed_user_nickname");

            migrationBuilder.CreateIndex(
                name: "fk_user_has_post_post1_idx",
                table: "like",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "fk_user_has_post_user1_idx",
                table: "like",
                column: "user_nickname");

            migrationBuilder.CreateIndex(
                name: "fk_post_user_idx",
                table: "post",
                column: "autor");

            migrationBuilder.CreateIndex(
                name: "id_UNIQUE1",
                table: "post",
                column: "id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "fk_post_draft_user_idx",
                table: "post_draft",
                column: "autor",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "nickname_UNIQUE",
                table: "user",
                column: "nickname",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comment");

            migrationBuilder.DropTable(
                name: "follow");

            migrationBuilder.DropTable(
                name: "like");

            migrationBuilder.DropTable(
                name: "post_draft");

            migrationBuilder.DropTable(
                name: "post");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
