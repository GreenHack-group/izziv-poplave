using pozivnik.Application;
using pozivnik.Application.Contracts;
using pozivnik.Infrastructure.Implementation;
using pozivnik.Infrastructure.Interfaces;
using pozivnik.Persistence.Implementation;
using pozivnik.Persistence.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IMapService, MapService>();
builder.Services.AddSingleton<IMapDataClient, MapDataClient>();
builder.Services.AddSingleton<IConnectionXML, ConnectionXML>();
builder.Services.AddSingleton<IConnectionDB,ConnectionDB>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "v1",
        Version = "v1"
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
