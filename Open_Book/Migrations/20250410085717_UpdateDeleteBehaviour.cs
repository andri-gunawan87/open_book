using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Open_Book.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDeleteBehaviour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookDetails_BookData_BookDataId",
                table: "BookDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_BookTags_BookData_BookDataId",
                table: "BookTags");

            migrationBuilder.DropForeignKey(
                name: "FK_BookTags_Tags_TagId",
                table: "BookTags");

            migrationBuilder.AddForeignKey(
                name: "FK_BookDetails_BookData_BookDataId",
                table: "BookDetails",
                column: "BookDataId",
                principalTable: "BookData",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookTags_BookData_BookDataId",
                table: "BookTags",
                column: "BookDataId",
                principalTable: "BookData",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookTags_Tags_TagId",
                table: "BookTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookDetails_BookData_BookDataId",
                table: "BookDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_BookTags_BookData_BookDataId",
                table: "BookTags");

            migrationBuilder.DropForeignKey(
                name: "FK_BookTags_Tags_TagId",
                table: "BookTags");

            migrationBuilder.AddForeignKey(
                name: "FK_BookDetails_BookData_BookDataId",
                table: "BookDetails",
                column: "BookDataId",
                principalTable: "BookData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookTags_BookData_BookDataId",
                table: "BookTags",
                column: "BookDataId",
                principalTable: "BookData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookTags_Tags_TagId",
                table: "BookTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
