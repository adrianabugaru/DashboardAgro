namespace DashboardAgro.Models
{
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Location Location { get; set; }
    }
}
