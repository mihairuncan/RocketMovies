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
            RuleFor(x => x.Name).Length(3, 30);
            RuleFor(x => x.Surname).Length(3, 30);
            //not under 18
            RuleFor(x => x.DateOfBirth.Year).LessThan(DateTime.Today.Year-18);
        }
    }
}
