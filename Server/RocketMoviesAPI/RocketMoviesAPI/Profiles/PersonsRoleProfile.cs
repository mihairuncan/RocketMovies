using AutoMapper;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;

namespace RocketMoviesAPI.Profiles
{
    public class PersonsRoleProfile : Profile
    {
        public PersonsRoleProfile()
        {
            CreateMap<PersonMovieRole, PersonRoleDto>()
               .ForMember(
                    dest => dest.Name,
                    opt => opt.MapFrom(src => src.Person.Name))
               .ForMember(
                    dest => dest.Surname,
                    opt => opt.MapFrom(src => src.Person.Surname))
               .ForMember(
                    dest => dest.DateOfBirth,
                    opt => opt.MapFrom(src => src.Person.DateOfBirth))
               .ForMember(
                    dest => dest.Role,
                    opt => opt.MapFrom(src => src.Role.ToString()));
        }
    }
}
