using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Core.Station
{
    public class SimpleHydroStationDto
    {
        public int stationId { get; set; }
        public float Longitude { get; set; }
        public float Latitude { get; set; }
        public int Radius { get; set; }
    }
}
