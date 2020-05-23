using FluentValidation;
using RocketMoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ModelValidators
{
    public class MovieValidator : AbstractValidator<Movie>
    {
        public MovieValidator()
        {
            RuleFor(x => x.Title).Length(2, 50);
            RuleFor(x => x.Year).InclusiveBetween(1900, 2100);
            RuleFor(x => x.PlotSummary)
                .MaximumLength(500)
                .WithMessage("The maximum length is 500 characters.");
            RuleFor(x => x.PictureURL).NotEmpty();
        }
    }
}
