using AutoMapper;
using FlowersApp.Helpers;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                    );
        }
    }
}
