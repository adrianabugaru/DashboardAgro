using System.Collections;
using System.Collections.Generic;

namespace DashboardAgro.Models
{
    public class Location
    {
        public int LocationId { get; set; }
        public virtual ICollection<MapPoint> MapPoints { get; set; }

        public Location()
        {
            MapPoints = new List<MapPoint>();
        }
    }
}
