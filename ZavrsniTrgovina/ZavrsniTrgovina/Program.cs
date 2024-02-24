using Zavrsni_Trgovina.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// prilagodba za dokumentaciju, čitati https://medium.com/geekculture/customizing-swagger-in-asp-net-core-5-2c98d03cbe52
builder.Services.AddSwaggerGen(sgo =>
{ // sgo je instanca klase SwaggerGenOptions
  // čitati https://devintxcontent.blob.core.windows.net/showcontent/Speaker%20Presentations%20Fall%202017/Web%20API%20Best%20Practices.pdf
    var o = new Microsoft.OpenApi.Models.OpenApiInfo()
    {
        Title = "Trgovina API",
        Version = "v1",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact()
        {
            Email = "sinisartf13@gmail.com",
            Name = "Dominik Farkaš"
        },
        Description = "Ovo je dokumentacija za Trgovina API",
        License = new Microsoft.OpenApi.Models.OpenApiLicense()
        {
            Name = "Trgovina licenca"
        }
    };
    sgo.SwaggerDoc("v1", o);

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

});


// dodavanje baze podataka
builder.Services.AddDbContext<TrgovinaContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString(name: "TrgovinaContext"))
);



var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
// mogućnost generiranja poziva rute u CMD i Powershell
app.UseSwaggerUI(opcije =>
{
    opcije.ConfigObject.
    AdditionalItems.Add("requestSnippetsEnabled", true);
});
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();

app.UseDeveloperExceptionPage();

app.MapFallbackToFile("index.html");

app.Run();
