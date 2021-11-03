﻿using pozivnik.Application.Contracts;
using pozivnik.Core.Station;
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

        public async Task<List<HydrologicalStationDto>> GetStationList() 
        {
            var response = await _mapDataClient.FetchAllStationsXML();

            return response;
        }
    }
}