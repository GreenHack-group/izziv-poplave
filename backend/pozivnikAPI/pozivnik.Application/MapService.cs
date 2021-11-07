using pozivnik.Application.Contracts;
using pozivnik.Core.Station;
using pozivnik.Core.User;
using pozivnik.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Application
{
    public class MapService : IMapService
    {
        private readonly IMapDataClient _mapDataClient;
        public MapService(
            IMapDataClient mapDataClient) 
        {
            _mapDataClient = mapDataClient;
        }

        public async Task<HydrologicalStationDataDto> GetStationData(string stationId)
        {
            var response = await _mapDataClient.FetchOneStationDataXML(stationId);

            return response;
        }
        public async Task<List<HydrologicalStationDto>> GetStationList() 
        {
            var response = await _mapDataClient.FetchAllStationsXML();

            return response;
        }
        public List<MeasurementDto> GetGraphData(string stationId) 
        {
            var response = _mapDataClient.FetchGraphData(stationId);

            return response; 
        }

        public async Task<string> PostDataInDatabase()
        {
            var response = await _mapDataClient.InsertDataInDatabase();
            return response;
        }

        public double CalculateDistance(UserDto user) 
        {
            var response = _mapDataClient.ManageUser(user);
            //Funkcija foreach za vsako postajo(H)

            return response;
        }
    }
}
