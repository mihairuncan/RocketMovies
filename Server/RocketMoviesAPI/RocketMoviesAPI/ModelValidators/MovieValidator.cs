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
            RuleFor(x => x.Title).MinimumLength(2).MaximumLength(20);
            RuleFor(x => x.Year).GreaterThan(2000);
            RuleFor(x => x.PlotSummary)
                .MaximumLength(150)
                .WithMessage("The maximum length is 150 characters.");
            RuleFor(x => x.PosterURL).NotEmpty();
        }
    }
}
