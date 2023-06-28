/*

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;




public class JwtHelper{

    public static string GenerateToken(BinaryReader key, User user){

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "https://myapi.com",
            audience: "https://myapi.com",
            claims: GetClaims(user),
            expires: DateTime.Now.AddMinutes(60),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
        
    }

    private static IEnumerable<Claim> GetClaims(User user){

        var claims = new List<Claim>{

            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role),
            
        };

        return claims;
    }
}
*/