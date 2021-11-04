using pozivnik.Core.Station;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Infrastructure.Interfaces
{
    //Operation + How many + What (+ Format)
    //e.g. Fetch + All + Stations (+ XML)
    public interface IMapDataClient
    {
        public Task<HydrologicalStationDataDto> FetchOneStationDataXML(string stationId);
        public Task<List<HydrologicalStationDto>> FetchAllStationsXML();
    }
}
