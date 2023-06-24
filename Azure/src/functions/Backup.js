const { app } = require("@azure/functions");
const { BlobServiceClient } = require("@azure/storage-blob");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Inits
const url = "mongodb+srv://admin:admin@cluster0.mxuzvr6.mongodb.net/";
const dbName = "test";
const containerName = "hello";
const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=mongoazurebackup;AccountKey=6ZMoxJiFbY6aD8h/TJKN/ase6wGz1wbaXmKBXoPF3K5wUAhTDiAQZu6GxCR/2+3ENPNzUX/GfpMR+AStDmHHLQ==;EndpointSuffix=core.windows.net";
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Making the json file
const fetchClientData = async () => {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("reports");
  const data = await collection.find({}).toArray();
  return data;
};

// Backup API
app.http("Backup", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async () => {
    const reportsData = await fetchClientData();
    const blobName = `data-${Date.now()}.json`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    try {
      await blockBlobClient.upload(JSON.stringify(reportsData),reportsData.length);
      return {
        body: `${JSON.stringify({ message: "File uploaded successfully" })}`,
      };
    } catch (error) {
      console.log(error);
      return { body: `${JSON.stringify({ message: "Something went wrong" })}` };
    }
  },
});
