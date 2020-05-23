using AutoMapper;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Profiles
{
    public class MoviesProfile : Profile
    {
        public MoviesProfile()
        {
            CreateMap<Movie, MovieDto>()
                .ForMember(
                    dest => dest.Rating,
                    opt => opt.MapFrom(src => src.UserRatings.Average(userRating => userRating.RatingValue)));
            CreateMap<MovieForCreationDto, Movie>();
        }
    }
}
