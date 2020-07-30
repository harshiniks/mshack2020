using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using GitHubKudos_2.Models;
using GitHubKudos_2.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Web.Http.Cors;

namespace GitHubKudos_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Microsoft.AspNetCore.Cors.EnableCors("MyPolicy")]
    public class ValuesController : ControllerBase
    {
        //private readonly UserKudosService userService;
        //[System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
        public UserKudosDbContext Db { get; }

        public ValuesController(UserKudosDbContext db)
        {
            Db = db;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        //[System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<UserKudos> Get(string id)
        {
            var query = new UserKudosService(Db);
            return query.GetKudosOfAUser(id.ToString());
        }

        // POST api/values/5
        [HttpPost]
        //[System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Post([FromBody]UserKudos userkudo)
        {
            var query = new UserKudosService(Db);
            query.InsertKudosForAUser(userkudo);
        }
    }
}
