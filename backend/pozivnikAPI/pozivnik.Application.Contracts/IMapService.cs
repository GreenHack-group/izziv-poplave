using pozivnik.Core.Station;
using pozivnik.Core.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Application.Contracts
{
    public interface IMapService
    {
        public Task<List<HydrologicalStationDto>> GetStationList();

        public Task<HydrologicalStationDataDto> GetStationData(string stationId);

        public List<MeasurementDto> GetGraphData(string stationId);

        public Task<string> PostDataInDatabase();
        public double CalculateDistance(UserDto user);
    }
}
