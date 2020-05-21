using FluentValidation;
using RocketMoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ModelValidators
{
    public class PersonValidator : AbstractValidator<Person>
    {
        public PersonValidator()
        {
            RuleFor(x => x.Name).MinimumLength(3).MaximumLength(15);
            RuleFor(x => x.Surname).MaximumLength(10);
            //not under 18
            RuleFor(x => x.DateOfBirth.Year).LessThan(DateTime.Today.Year-18);
        }
    }
}
