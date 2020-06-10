using FluentValidation;
using RocketMoviesAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ModelValidators
{
    public class CommentForUpdateValidator : AbstractValidator<CommentForUpdate>
    {
        public CommentForUpdateValidator()
        {
            RuleFor(x => x.CommentText).Length(5, 150);
        }
    }
}
