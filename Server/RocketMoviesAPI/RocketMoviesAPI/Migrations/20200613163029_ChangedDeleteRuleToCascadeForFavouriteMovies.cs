using Microsoft.EntityFrameworkCore.Migrations;

namespace RocketMoviesAPI.Migrations
{
    public partial class ChangedDeleteRuleToCascadeForFavouriteMovies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteMovies_Movies_MovieId",
                table: "FavouriteMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteMovies_Users_UserId",
                table: "FavouriteMovies");

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteMovies_Movies_MovieId",
                table: "FavouriteMovies",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteMovies_Users_UserId",
                table: "FavouriteMovies",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteMovies_Movies_MovieId",
                table: "FavouriteMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteMovies_Users_UserId",
                table: "FavouriteMovies");

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteMovies_Movies_MovieId",
                table: "FavouriteMovies",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteMovies_Users_UserId",
                table: "FavouriteMovies",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
