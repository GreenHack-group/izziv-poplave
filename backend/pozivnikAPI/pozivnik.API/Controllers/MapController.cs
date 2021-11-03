using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pozivnik.Application.Contracts;
using pozivnik.Core.Station;

namespace pozivnik.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IMapService _mapService;
        //Dependency injection -> interface iz pozivnik.Application.Contracts
        public MapController(
            IMapService mapService) 
        { 
            //this.mapService = _mapService
            _mapService = mapService;
        }

        // ..../api/Map/stationMarkers
        [HttpGet]
        [Route("stationMarkers")]
        public String FetchAllStationMarkers() {

            //Klicala interface
            var response = _mapService.GetStationList();

            return response;
        }
        
    }
}
