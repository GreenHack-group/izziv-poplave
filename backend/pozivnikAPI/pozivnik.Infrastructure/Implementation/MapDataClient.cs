using MySql.Data.MySqlClient;
using pozivnik.Core.Station;
using pozivnik.Core.User;
using pozivnik.Infrastructure.Interfaces;
using pozivnik.Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using Geolocation;
using Xamarin.Essentials;

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

            var conn = _connectionDB.getDB();

            string sql = "SELECT m.datum_cas, m.vodostaj, m.pretok, m.temperatura_voda "+
                        "FROM meritev m "+
                        "WHERE m.sifra_postaja = " + stationId ;
            using var cmd = new MySqlCommand(sql, conn);

            using MySqlDataReader rdr = cmd.ExecuteReader();
            List<MeasurementDto> measurementList = new List<MeasurementDto>();
            while (rdr.Read())
            {
                MeasurementDto measurement = new MeasurementDto {
                    DateOfMeasurement = DateTime.Parse(rdr.GetString(0)),
                    waterLevel = float.Parse(rdr.GetString(1))/100,
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
                                        ? null : float.Parse(xn["vodostaj"].InnerText)/100,
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
        public async Task<string> InsertDataInDatabase()
        {   
            //Pridobimo XML podatke
            var xml = await _connectionXML.getXML();
            XmlNodeList xnList = xml.SelectNodes("/arsopodatki/postaja");

            //Database connection
            var conn = _connectionDB.getDB();
            
            //FILL Postaja
            foreach (XmlNode xn in xnList)
            {
                int stationId = int.Parse(xn.Attributes["sifra"].Value);
                string stationName = xn["merilno_mesto"].InnerText;
                float longitude = float.Parse(xn.Attributes["ge_dolzina"].Value);
                float latitude = float.Parse(xn.Attributes["ge_sirina"].Value);
                string river = xn["reka"].InnerText;
                string date = xn["datum"].InnerText;


                using var cmd = new MySqlCommand("INSERT INTO postaja (sifra_postaja, ime_postaja, ge_dolzina, ge_sirina, radij, reka, zadnja_sprememba) " +
                                                 "SELECT @stationId, @stationName, @longitude, @latitude, @radius, @river, @lastchange WHERE NOT EXISTS (SELECT sifra_postaja FROM postaja WHERE sifra_postaja = @stationId) LIMIT 1;", conn);

                cmd.Parameters.AddWithValue("@stationId", stationId);
                cmd.Parameters.AddWithValue("@stationName", stationName);
                cmd.Parameters.AddWithValue("@longitude", longitude);
                cmd.Parameters.AddWithValue("@latitude", latitude);
                cmd.Parameters.AddWithValue("@radius", 10);
                cmd.Parameters.AddWithValue("@river", river);
                cmd.Parameters.AddWithValue("@lastchange", DateTime.MinValue.ToString());

                cmd.ExecuteNonQuery();
            }
            conn.Close();
            //FILL Meritev
           var node = xnList[0];
            DateTime xmlDate = DateTime.Parse(node["datum"].InnerText); //iz XML

            var conn1 = _connectionDB.getDB();

            int stationId2 = int.Parse(node.Attributes["sifra"].Value);
            using var cmd1 = new MySqlCommand("SELECT zadnja_sprememba FROM postaja WHERE sifra_postaja = @stationId2", conn1);
            cmd1.Parameters.AddWithValue("@stationId2", stationId2);
            using MySqlDataReader rdr = cmd1.ExecuteReader();
            string zadnja = "";
            while (rdr.Read())
            {
                zadnja = (rdr.GetString(0) == null) ? DateTime.MinValue.ToString() : rdr.GetString(0);
            }

            conn1.Close();
            var conn2 = _connectionDB.getDB();

            if (xmlDate > DateTime.Parse(zadnja))
            {
                foreach (XmlNode xn in xnList)
                {
                    int stationId = int.Parse(xn.Attributes["sifra"].Value);
                    string date = xn["datum"].InnerText;
                    float waterLevel = (xn["vodostaj"] == null || xn["vodostaj"].InnerText == "")
                                        ? 0 : float.Parse(xn["vodostaj"].InnerText);
                    float waterFlow = (xn["pretok"] == null || xn["pretok"].InnerText == "")
                                      ? 0 : float.Parse(xn["pretok"].InnerText);
                    float waterTemperature = (xn["temp_vode"] == null || xn["temp_vode"].InnerText == "")
                                            ? 0 : float.Parse(xn["temp_vode"].InnerText);

                    using var cmd2 = new MySqlCommand("INSERT INTO meritev VALUES (@stationId, @datum, @waterlevel, @waterflow, @watertemperature, @wave);", conn2);
                    cmd2.Parameters.AddWithValue("@stationId", stationId);
                    cmd2.Parameters.AddWithValue("@datum", date);
                    cmd2.Parameters.AddWithValue("@waterlevel", waterLevel);
                    cmd2.Parameters.AddWithValue("@waterflow", waterFlow);
                    cmd2.Parameters.AddWithValue("@watertemperature", waterTemperature);
                    cmd2.Parameters.AddWithValue("@wave", null);

                    cmd2.ExecuteNonQuery();

                    using var cmd3 = new MySqlCommand("UPDATE postaja SET zadnja_sprememba = @datum;", conn2);
                    cmd3.Parameters.AddWithValue("@datum", date);
                    cmd3.ExecuteNonQuery();
                }
            }
            conn2.Close();
           

            return "hiya boi";
        }

        public double ManageUser(UserDto user)
        {
            //Napolnimo postaje
            var conn = _connectionDB.getDB();
            using var cmd = new MySqlCommand("SELECT sifra_postaja, ge_dolzina, ge_sirina, radij FROM postaja", conn);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<SimpleHydroStationDto> listOfStations = new List<SimpleHydroStationDto>();

            while (rdr.Read())
            {
                int stationId = int.Parse(rdr.GetString(0));
                float longitude = float.Parse(rdr.GetString(1));
                float latitude = float.Parse(rdr.GetString(2));
                int radij = int.Parse(rdr.GetString(3));

                SimpleHydroStationDto temp = new SimpleHydroStationDto {
                    stationId = stationId,
                    Longitude = longitude,
                    Latitude = latitude,
                    Radius = radij
                };
                listOfStations.Add(temp);
            }
            conn.Close();

            var conn1 = _connectionDB.getDB();
            using var cmd1 = new MySqlCommand("INSERT INTO uporabnik VALUES(@token, @ge_dolzina_u, @ge_sirina_u)", conn1);
            cmd1.Parameters.AddWithValue("@token", user.Token);
            cmd1.Parameters.AddWithValue("@ge_dolzina_u", user.Location.Longitude.ToString());
            cmd1.Parameters.AddWithValue("@ge_sirina_u", user.Location.Latitude.ToString());
            cmd1.ExecuteNonQuery();
            conn1.Close();

            //Harveine
            foreach (SimpleHydroStationDto ele in listOfStations)
            {
                int radius = ele.Radius;
                double latStation = ele.Latitude * (Math.PI / 180.0);
                double longStation = ele.Longitude * (Math.PI / 180.0);
                double latUser = user.Location.Latitude * (Math.PI / 180.0);
                double longUser = user.Location.Longitude * (Math.PI / 180.0) - longStation;

                var d3 = Math.Pow(Math.Sin((latUser - latStation) / 2.0), 2.0) +
                         Math.Cos(latStation) * Math.Cos(latUser) * Math.Pow(Math.Sin( longUser/ 2.0), 2.0);
                double res = 6376.5 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));

                //return res;

                if (radius > res)
                {
                    //INSERT user
                    var conn2 = _connectionDB.getDB();
                    using var cmd2 = new MySqlCommand("INSERT INTO je_v_blizini VALUES(@token, @sifra_postaja)", conn2);
                    cmd2.Parameters.AddWithValue("@token", user.Token);
                    cmd2.Parameters.AddWithValue("@sifra_postaja", ele.stationId.ToString());
                    cmd2.ExecuteNonQuery();
                    conn2.Close();
                }
            }
            
            return 0;
        }
    }
}
