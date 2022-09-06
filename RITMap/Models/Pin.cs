namespace RITMap.Models
{
    public class Pin
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Text { get; set; }
        public string Category { get; set; }
        public int Reports { get; set; }
    }
}
