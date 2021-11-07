using pozivnik.Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace pozivnik.Persistence.Implementation
{
    public class ConnectionDB : IConnectionDB
    {
        public MySqlConnection getDB()
        {
            try
            {
                string myConnectionString =
                    "Database =poplave; Data Source = poplave.mysql.database.azure.com; User Id = poplave@poplave; Password =Greenhack123!";

                var conn = new MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();

                return conn;

            }
            catch (Exception ex) 
            {
                //TODO
            }
            return null;
        }
    }
}