using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace DashboardAgro.Models
{
    public class MapPoint
    {
        public int MapPointId { get; set; }
        public string Name { get; set; }
        public int AltitudeReference { get; set; }
        public int Altitude { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public virtual Location Location { get; set; }
    }
}
