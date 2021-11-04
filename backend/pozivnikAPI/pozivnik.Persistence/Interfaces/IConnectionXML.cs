using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace pozivnik.Persistence.Interfaces
{
    public interface IConnectionXML
    {
        public Task<XmlDocument> getXML();
    }
}
