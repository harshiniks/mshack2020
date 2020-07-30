using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace GitHubKudos_2.Models
{
    public class UserKudosDbContext : IDisposable
    {
        public MySqlConnection Connection { get; }

        public UserKudosDbContext(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
            Connection.Open();
        }

        public void Dispose() => Connection.Dispose();
    }
}
