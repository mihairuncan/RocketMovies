using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ViewModels
{
    public class PersonRoleDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Role { get; set; }
    }
}
