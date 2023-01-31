public partial class GetSinglePostDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime? CreatedAt { get; set; }
    public string Autor { get; set; } = null!;
    public string Body { get; set; } = null!;
    public int? Likes { get; set; }
    public Boolean? UserDoesLike { get; set; }
    public int CommentsNumber { get; set; }
}