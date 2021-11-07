using pozivnik.Core.Station;
using pozivnik.Core.User;
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
        public List<MeasurementDto> FetchGraphData(string stationId);
        public Task<string> InsertDataInDatabase();
        public double ManageUser(UserDto user); //fetch + operacija + insert
        public Task<List<PushPackageDto>> PushNotification();

    }
}
