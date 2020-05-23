﻿using AutoMapper;
using RocketMoviesAPI.Models;
using RocketMoviesAPI.ViewModels;

namespace RocketMoviesAPI.Profiles
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<UserComment, CommentDto>()
                 .ForMember(
                    dest => dest.Username,
                    opt => opt.MapFrom(src => src.User.Username))
                .ForMember(
                    dest => dest.CommentText,
                    opt => opt.MapFrom(src => src.Comment.CommentText))
                .ForMember(
                    dest => dest.AddedOn,
                    opt => opt.MapFrom(src => src.Comment.AddedOn));
        }
    }
}