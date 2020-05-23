using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RocketMoviesAPI.ViewModels
{
    public class MovieForCreationDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string PlotSummary { get; set; }
        public long GrossTakingsAmount { get; set; }
        public bool IsAvailableOnDVD { get; set; }
        public string Genre { get; set; }
        public string PosterURL { get; set; }
    }
}
