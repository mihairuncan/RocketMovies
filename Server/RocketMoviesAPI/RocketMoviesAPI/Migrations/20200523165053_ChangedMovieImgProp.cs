using Microsoft.EntityFrameworkCore.Migrations;

namespace RocketMoviesAPI.Migrations
{
    public partial class ChangedMovieImgProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosterURL",
                table: "Movies");

            migrationBuilder.AddColumn<string>(
                name: "PictureURL",
                table: "Movies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PictureURL",
                table: "Movies");

            migrationBuilder.AddColumn<string>(
                name: "PosterURL",
                table: "Movies",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}
