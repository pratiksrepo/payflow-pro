FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY . .

WORKDIR /src/services/PayFlow.NotificationService

RUN dotnet restore PayFlow.NotificationService.csproj

RUN dotnet publish PayFlow.NotificationService.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet","PayFlow.NotificationService.dll"]