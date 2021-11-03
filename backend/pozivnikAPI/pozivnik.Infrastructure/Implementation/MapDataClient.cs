using pozivnik.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Infrastructure.Implementation
{
    public class MapDataClient : IMapDataClient
    {
        public String getAllStationsXML() {
            return "meow"; //return file
        }

        public String FetchAllStationsXML() 
        {
            var file = getAllStationsXML();
            return file; //formatirala/parsala
        }
    }
}
