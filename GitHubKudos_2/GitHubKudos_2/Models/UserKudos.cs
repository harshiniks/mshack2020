using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GitHubKudos_2.Models
{
    public class UserKudos
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string user_id_assigned_to { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string user_id_assigned_by { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string message { get; set; }
    }
}
