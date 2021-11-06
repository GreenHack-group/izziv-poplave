using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Core.Station
{
    public class MeasurementDto
    {
        public DateTime? DateOfMeasurement { get; set; }
        public float? waterLevel { get; set; }
        public float? waterFlow { get; set; }
        public float? waterTemperature { get; set; }
    }
}
