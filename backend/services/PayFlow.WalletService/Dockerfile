FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY . .

WORKDIR /src/services/PayFlow.WalletService

RUN dotnet restore PayFlow.WalletService.csproj

RUN dotnet publish PayFlow.WalletService.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet","PayFlow.WalletService.dll"]