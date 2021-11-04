using pozivnik.Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace pozivnik.Persistence.Implementation
{
    public class ConnectionXML : IConnectionXML
    {
        private static readonly HttpClient client = new HttpClient();

        public async Task<XmlDocument> getXML()
        {
            var response = await client.GetAsync("http://www.arso.gov.si/xml/vode/hidro_podatki_zadnji.xml");
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();

                XmlDocument xml = new XmlDocument();
                xml.LoadXml(responseBody);
                return xml;
            }
            return null;
        }
    }
}
