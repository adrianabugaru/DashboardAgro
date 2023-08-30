using Microsoft.EntityFrameworkCore.Migrations;

namespace DashboardAgro.Migrations
{
    public partial class DifferentPrecision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "MapPoints",
                type: "decimal(18,9)",
                precision: 18,
                scale: 9,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,4)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "MapPoints",
                type: "decimal(18,9)",
                precision: 18,
                scale: 9,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,4)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "MapPoints",
                type: "decimal(5,4)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,9)",
                oldPrecision: 18,
                oldScale: 9);

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "MapPoints",
                type: "decimal(5,4)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,9)",
                oldPrecision: 18,
                oldScale: 9);
        }
    }
}
