using AutoMapper;
using RocketMoviesAPI.Helpers;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;
using System;

namespace RocketMoviesAPI.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserForCreation, User>()
                .ForMember(
                    dest => dest.Password,
                    opt => opt.MapFrom(src => HashUtils.GetHashString(src.Password))
                    )
                .ForMember(
                    dest => dest.CreationDate,
                    opt => opt.MapFrom(src => DateTime.Now)
                    )
                .ForMember(
                    dest => dest.LastLogin,
                    opt => opt.MapFrom(src => DateTime.Now)
                    );
            CreateMap<User, UserWithToken>();
            CreateMap<UserForUpdate, User>();
        }
    }
}
