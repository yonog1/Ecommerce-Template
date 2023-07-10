using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.RequestHelpers;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginatopnHeader(this HttpResponse response, MetaData metaData)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            // add pagination header to the response 
            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));

            // add CORS headers 'Pagination' to the response
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}