using System;
using System.Collections.Generic;

namespace RocketMoviesAPI.Models
{
    public class Person
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime? DateOfDeath { get; set; }
        public List<PersonMovieRole> PersonMovieRoles { get; set; }
    }
}
