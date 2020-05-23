using FluentValidation;
using RocketMoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ModelValidators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.Name).Length(3, 30);
            RuleFor(x => x.Username)
                .NotEmpty()
                .WithMessage("Required username");
            RuleFor(x => x.Password)
                .Matches(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])")
                .Length(8)
                .WithMessage("Password must contain at least one uppercase, one lower case, one number and one special character and length must be 8 characters");
            RuleFor(x => x.Email).EmailAddress()
                .WithMessage("Required a valid e-mail adress");
            RuleFor(x => x.CreationDate).LessThanOrEqualTo(DateTime.Now);
        }
    }
}
