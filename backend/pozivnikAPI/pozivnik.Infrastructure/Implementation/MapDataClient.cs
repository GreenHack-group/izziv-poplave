using MySql.Data.MySqlClient;
using pozivnik.Core.Station;
using pozivnik.Infrastructure.Interfaces;
using pozivnik.Persistence.Interfaces;
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
        private readonly IConnectionXML _connectionXML;
        private readonly IConnectionDB _connectionDB;

        public MapDataClient(
            IConnectionXML connectionXML,
            IConnectionDB connectiobDB) 
        {
            _connectionXML = connectionXML;
            _connectionDB = connectiobDB;
        }

        public List<MeasurementDto> FetchGraphData(string stationId)
        {

            var conn = _connectionDB.getDB(stationId);

            string sql = "SELECT m.datum_cas, m.vodostaj, m.pretok, m.temperatura_vode "+
                        "FROM meritev m "+
                        "WHERE m.sifra_postaja = " + stationId ;
            using var cmd = new MySqlCommand(sql, conn);

            using MySqlDataReader rdr = cmd.ExecuteReader();
            List<MeasurementDto> measurementList = new List<MeasurementDto>();
            while (rdr.Read())
            {
                MeasurementDto measurement = new MeasurementDto {
                    DateOfMeasurement = DateTime.Parse(rdr.GetString(0)),
                    waterLevel = float.Parse(rdr.GetString(1)),
                    waterFlow = float.Parse(rdr.GetString(2)),
                    waterTemperature = float.Parse(rdr.GetString(3)),
                };

                measurementList.Add(measurement);
            }
            return measurementList;
        }
        public int calculateDangerLevel(XmlNode xn) {
            if ((xn["vodostaj_znacilni"] == null || xn["vodostaj_znacilni"].InnerText == "")
                && (xn["pretok_znacilni"] == null || xn["pretok_znacilni"].InnerText == ""))
            {
                return 4;
            }
            else if (xn["vodostaj_znacilni"] == null || xn["vodostaj_znacilni"].InnerText == "")
            {
                switch (xn["pretok_znacilni"].InnerText)
                {
                    case "prvi visokovodni pretok":
                        return 1;
                    case "drugi visokovodni pretok":
                        return 2;
                    case "tretji visokovodni pretok":
                        return 3;
                    default:
                        return 0;
                }
            }
            else if (xn["pretok_znacilni"] == null || xn["pretok_znacilni"].InnerText == "")
            {
                switch (xn["vodostaj_znacilni"].InnerText)
                {
                    case "prvi visokovodni vodostaj":
                        return 1;
                    case "drugi visokovodni vodostaj":
                        return 2;
                    case "tretji visokovodni vodostaj":
                        return 3;
                    default:
                        return 0;
                }
            }
            else 
            {
                return 4;
            }
        }

        public async Task<List<HydrologicalStationDto>> FetchAllStationsXML()
        {
            var xml = await _connectionXML.getXML();
            XmlNodeList xnList = xml.SelectNodes("/arsopodatki/postaja");

            List<HydrologicalStationDto> hydrologicalStations = new List<HydrologicalStationDto>();

            foreach (XmlNode xn in xnList)
            {
                HydrologicalStationDto temp = new HydrologicalStationDto
                {
                    StationId = int.Parse(xn.Attributes["sifra"].Value),
                    River = xn["reka"].InnerText,
                    MeasuringPoint = xn["merilno_mesto"].InnerText,
                    Longitude = float.Parse(xn.Attributes["ge_dolzina"].Value),
                    Latitude = float.Parse(xn.Attributes["ge_sirina"].Value),
                    DangerLevel = calculateDangerLevel(xn)
                };
                hydrologicalStations.Add(temp);
            }
            return hydrologicalStations;

        }
        public async Task<HydrologicalStationDataDto> FetchOneStationDataXML(string stationId) 
        {
            var xml = await _connectionXML.getXML();
            XmlNodeList xnList = xml.SelectNodes("/arsopodatki/postaja");

            foreach (XmlNode xn in xnList)
            {
                if (xn.Attributes["sifra"].Value == stationId)
                {
                    HydrologicalStationDataDto hy = new HydrologicalStationDataDto
                    {
                        River = (xn["reka"] == null || xn["reka"].InnerText == "") 
                                ? null : xn["reka"].InnerText,
                        MeasuringPoint = (xn["merilno_mesto"] == null || xn["merilno_mesto"].InnerText == "")
                                ? null : xn["merilno_mesto"].InnerText,
                        DateAndTime = (xn["datum"] == null || xn["datum"].InnerText == "")
                                        ? null : DateTime.Parse(xn["datum"].InnerText),
                        WaterLevel = (xn["vodostaj"] == null || xn["vodostaj"].InnerText == "")
                                        ? null : int.Parse(xn["vodostaj"].InnerText),
                        WaterLevelGroup = (xn["vodostaj_znacilni"] == null || xn["vodostaj_znacilni"].InnerText == "")
                                            ? null : xn["vodostaj_znacilni"].InnerText,
                        WaterFlow = (xn["pretok"] == null || xn["pretok"].InnerText == "")
                                      ? null : float.Parse(xn["pretok"].InnerText),
                        WaterFlowGroup = (xn["pretok_znacilni"] == null || xn["pretok_znacilni"].InnerText == "")
                                          ? null : xn["pretok_znacilni"].InnerText,
                        WaterTemperature = (xn["temp_vode"] == null || xn["temp_vode"].InnerText == "")
                                            ? null : float.Parse(xn["temp_vode"].InnerText)
                    };
                    return hy;
                }
            }


            return null;
        }
    }
}
