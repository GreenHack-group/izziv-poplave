using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace pozivnik.Core.Station
{
    public class HydrologicalStationDataDto
    {
        public string? River { get; set; }
        public string? MeasuringPoint { get; set; }
        public DateTime? DateAndTime { get; set; }
        public int? WaterLevel { get; set; }
        public string? WaterLevelGroup { get; set; }
        public float? WaterFlow { get; set; }
        public string? WaterFlowGroup { get; set; }
        public float? WaterTemperature {get; set; }
        public float? FirstHWLevel { get; set; } //first high water level
        public float? SecondHWLevel { get; set; }
        public float? ThirdHWLevel { get; set; }
        public float? FirstHWFlow { get; set; } //first high water flow
        public float? SecondHWFlow { get; set; }
        public float? ThirdHWFlow { get; set; }
        public float? WaveHeight { get; set; }

    }
}
