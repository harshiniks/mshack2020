using GitHubKudos_2.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Data.Common;
using System.Threading.Tasks;

namespace GitHubKudos_2.Service
{
    public class UserKudosService
    {
        public UserKudosDbContext Db { get; }

        public UserKudosService(UserKudosDbContext db)
        {
            Db = db;
        }

        public IEnumerable<UserKudos> GetKudosOfAUser(string userid)
        {
            var cmd = Db.Connection.CreateCommand();
            List<UserKudos> userKudos = new List<UserKudos>();
            cmd.CommandText = "SELECT * FROM `kudos` WHERE `user_id_assigned_to` = @userid";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@userid",
                DbType = DbType.String,
                Value = userid,
            });
            using (MySqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    UserKudos userKudo = new UserKudos();
                    userKudo.id = (int)reader["id"];
                    userKudo.user_id_assigned_to = reader["user_id_assigned_to"].ToString();
                    userKudo.user_id_assigned_by = reader["user_id_assigned_by"].ToString();
                    userKudo.message = reader["user_kudos_message"].ToString();
                    userKudos.Add(userKudo);
                }
            }
            Db.Connection.Close();
            return userKudos;
        }

        public void InsertKudosForAUser(UserKudos userkudo)
        {
            try
            {
                var cmd = Db.Connection.CreateCommand();
                List<UserKudos> userKudos = new List<UserKudos>();
                string userId_1 = userkudo.user_id_assigned_to;
                string userId_2 = userkudo.user_id_assigned_by;
                string message = userkudo.message;
                cmd.CommandText = "insert into kudos(user_id_assigned_to,user_id_assigned_by,user_kudos_message) values(@userId_1, @userId_2, @message);";
                cmd.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@userId_1",
                    DbType = DbType.String,
                    Value = userId_1,
                });
                cmd.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@userId_2",
                    DbType = DbType.String,
                    Value = userId_2,
                });
                cmd.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@message",
                    DbType = DbType.String,
                    Value = message,
                });
                cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                String msg = e.Message;
            }
            finally
            {
                Db.Connection.Close();
            }
        }
    }
}
