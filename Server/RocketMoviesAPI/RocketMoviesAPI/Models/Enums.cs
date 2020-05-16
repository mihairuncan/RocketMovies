using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.Models
{
    public class Enums
    {
        enum Role { Director, Writer, Actor, Producer, };
        enum Genre { Action, Comedy, Thriller, Adventure, Horror, Drama };
        enum Rating
        {
            Awful = 1,
            Bad = 2,
            Medium = 3,
            Good = 4,
            Awesome = 5
        }
    }
}
