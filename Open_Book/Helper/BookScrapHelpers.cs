using System.Globalization;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace Open_Book.Helper
{
    public static class BookScrapHelpers
    {
        public static DateTime? ParsePublishedDate(string publishedDate)
        {
            if (DateTime.TryParseExact(
                    publishedDate,
                    "dd MMMM yyyy",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out DateTime parsedDate))
            {
                return parsedDate;
            }

            return null;
        }

        public static int ParseTotalPages(string totalPages)
        {
            var match = Regex.Match(totalPages, @"\d+");
            if (match.Success && int.TryParse(match.Value, out int result))
            {
                return result;
            }

            return 0;
        }

        public static decimal ParsePrice(string price)
        {
            if (string.IsNullOrWhiteSpace(price))
                return 0;

            var cleaned = Regex.Replace(price, @"[^\d,\.]", "");

            cleaned = cleaned.Replace(",", "");

            if (decimal.TryParse(cleaned, NumberStyles.Number, CultureInfo.InvariantCulture, out decimal result))
            {
                return result;
            }

            return 0;
        }

        public static string GenerateRandomHex24()
        {
            byte[] buffer = new byte[12];
            RandomNumberGenerator.Fill(buffer);
            return BitConverter.ToString(buffer).Replace("-", "").ToLower();
        }
    }
}
