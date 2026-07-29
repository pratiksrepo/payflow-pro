FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY . .

WORKDIR /src/gateway/PayFlow.ApiGateway

RUN dotnet restore PayFlow.ApiGateway.csproj

RUN dotnet publish PayFlow.ApiGateway.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "PayFlow.ApiGateway.dll"]