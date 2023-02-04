namespace agora.Models
{
    public partial class GetUserInfoDTO
    {
        public string Nickname { get; set; } = null!;
        public Boolean UserDoesFollow { get; set; }
        public int NumberOfFollowers { get; set; }
        public int NumberOfFollowed { get; set; }
        public int NumberOfLikes { get; set; }
    }
}
