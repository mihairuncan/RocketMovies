using FluentValidation;
using RocketMoviesAPI.Models;

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
        }
    }
}
