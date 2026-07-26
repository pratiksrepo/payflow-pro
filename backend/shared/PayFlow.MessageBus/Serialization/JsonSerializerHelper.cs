using System.Text.Json;

namespace PayFlow.MessageBus.Serialization;

public static class JsonSerializerHelper
{
    public static byte[] Serialize<T>(T message)
    {
        return System.Text.Encoding.UTF8.GetBytes(

            JsonSerializer.Serialize(message)

        );
    }
}