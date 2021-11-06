using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Persistence.Interfaces
{
    public interface IConnectionDB
    {
        public MySqlConnection getDB(string stationId);
    }
}
