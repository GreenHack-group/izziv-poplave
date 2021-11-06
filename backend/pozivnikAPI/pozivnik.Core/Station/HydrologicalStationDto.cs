using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Core.Station
{
    public class HydrologicalStationDto
    {   
        public int StationId { get; set; } //sifra
        public string River { get; set; }
        public string MeasuringPoint { get; set; } 
        public float Longitude { get; set; }
        public float Latitude { get; set; }
        public int DangerLevel { get; set; }

    }
}
