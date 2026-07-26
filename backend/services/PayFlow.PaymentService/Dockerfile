# --------------------
# Build Stage
# --------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY . .

WORKDIR /src/services/PayFlow.PaymentService

RUN dotnet restore PayFlow.PaymentService.csproj

RUN dotnet publish PayFlow.PaymentService.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# --------------------
# Runtime Stage
# --------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet","PayFlow.PaymentService.dll"]