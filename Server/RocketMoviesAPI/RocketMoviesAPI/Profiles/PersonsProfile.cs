using AutoMapper;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;

namespace RocketMoviesAPI.Profiles
{
    public class PersonsProfile:Profile
    {
        public PersonsProfile()
        {
            CreateMap<Person, PersonDto>();
        }
    }
}
