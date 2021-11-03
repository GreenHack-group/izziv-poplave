using pozivnik.Core.Station;
using pozivnik.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace pozivnik.Infrastructure.Implementation
{
    public class MapDataClient : IMapDataClient
    {
        private static readonly HttpClient client = new HttpClient();

        public async Task<List<HydrologicalStationDto>> getAllStationsXML()
        {
            var response = await client.GetAsync("http://www.arso.gov.si/xml/vode/hidro_podatki_zadnji.xml");
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();

                XmlDocument xml = new XmlDocument();
                xml.LoadXml(responseBody);

                XmlNodeList xnList = xml.SelectNodes("/arsopodatki/postaja");

                List<HydrologicalStationDto> hydrologicalStations = new List<HydrologicalStationDto>();

                foreach (XmlNode xn in xnList)
                {
                    HydrologicalStationDto temp = new HydrologicalStationDto { 
                        StationId = int.Parse(xn.Attributes["sifra"].Value),
                        Longitude = float.Parse(xn.Attributes["ge_dolzina"].Value),
                        Latitude = float.Parse(xn.Attributes["ge_sirina"].Value)
                    };
                    hydrologicalStations.Add(temp);
                    
                }

                return hydrologicalStations;
            }
            else
            {
                //TODO
                return null;
            }
        }

        public async Task<List<HydrologicalStationDto>> FetchAllStationsXML() 
        {
            var response = await getAllStationsXML();
            return response; 
        }
    }
}
