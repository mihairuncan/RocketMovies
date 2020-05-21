using FluentValidation;
using RocketMoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ModelValidators
{
    public class UserRatingValidator : AbstractValidator<UserRating>
    {
        public UserRatingValidator()
        {
            RuleFor(x => x.RatingValue).InclusiveBetween(1, 5);
        }
    }
}
