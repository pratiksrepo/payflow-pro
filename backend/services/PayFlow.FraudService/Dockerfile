FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY . .

WORKDIR /src/services/PayFlow.FraudService

RUN dotnet restore PayFlow.FraudService.csproj

RUN dotnet publish PayFlow.FraudService.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet","PayFlow.FraudService.dll"]