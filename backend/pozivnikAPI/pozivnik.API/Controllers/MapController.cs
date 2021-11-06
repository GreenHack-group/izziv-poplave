using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using pozivnik.Application.Contracts;
using pozivnik.Core.Station;
using System.Xml;

namespace pozivnik.API.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IMapService _mapService;
        public MapController(
            IMapService mapService) 
        { 
            _mapService = mapService;
        }

        [HttpGet]
        [Route("stationMarkers")]
        public async Task<List<HydrologicalStationDto>> FetchAllStationMarkers() 
        {
            var response = await _mapService.GetStationList();

            return response;
        }
        [HttpGet]
        [Route("station")]
        public async Task<HydrologicalStationDataDto> FetchStation(string? stationId)
        {
            var response = await _mapService.GetStationData(stationId);
            return response;
        }

        [HttpGet]
        [Route("graph")]
        public List<MeasurementDto> FetchGraphData(string stationId)
        {
            var response = _mapService.GetGraphData(stationId);
            return response;
        }

        [HttpPost]
        [Route("lastData")]
        [FunctionName("TimerTriggerCSharp")]
        public string PostLastDataEntry([TimerTrigger("* 30 * * * *")] TimerInfo myTime) {
            //Every 30 minutes it posts a data entry 
            var response = "";
            return response;
        }

        [HttpGet]
        [Route("meow")]
        public string getMeow()
        {
            return "meow mepw";
        }
    }               
}
