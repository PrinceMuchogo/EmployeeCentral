using Newtonsoft.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Employee_Management_System.Data;
using Microsoft.AspNetCore.Authentication.Certificate;

namespace Employee_Management_System

{
    public class Startup{

        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration){
            _configuration = configuration;
        }

        public IConfiguration? Configuration {get;}


        public void ConfigureServices(IServiceCollection services){

            //Enable CORS
            services.AddCors(cors =>{
                cors.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyHeader());
            });

            services.AddAuthentication(
                CertificateAuthenticationDefaults.AuthenticationScheme)
                .AddCertificate();

        /*
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://myapi.com",
            ValidAudience = "https://myapi.com",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("12345"))
        };
    });
    */

            services.AddDbContext<AppDBContext>(options =>
                options.UseSqlServer(_configuration.GetConnectionString("employee-management")));

            //Json serializer
            services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
                = new DefaultContractResolver());

            services.AddControllers();
        }


        // method to configure the HTTP requests
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env){

            
            //Enable CORS
            //app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            if (env.IsDevelopment()){
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
                endpoints.MapGet("/", async context =>
    {
        await context.Response.WriteAsync("Hello World!");
    });
            });

        }
    }
}