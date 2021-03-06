﻿using FluentValidation;
using RocketMoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ModelValidators
{
    public class CommentValidator : AbstractValidator<Comment>
    {
        public CommentValidator()
        {
            RuleFor(x => x.CommentText).Length(5, 150);
            RuleFor(x => x.AddedOn).LessThanOrEqualTo(DateTime.Now);
        }
    }
}
