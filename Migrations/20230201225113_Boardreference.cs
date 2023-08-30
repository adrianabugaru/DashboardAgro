using Microsoft.EntityFrameworkCore.Migrations;

namespace DashboardAgro.Migrations
{
    public partial class Boardreference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Boards");

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "Boards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Boards_LocationId",
                table: "Boards",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Boards_Locations_LocationId",
                table: "Boards",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "LocationId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boards_Locations_LocationId",
                table: "Boards");

            migrationBuilder.DropIndex(
                name: "IX_Boards_LocationId",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Boards");

            migrationBuilder.AddColumn<float>(
                name: "Location",
                table: "Boards",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
