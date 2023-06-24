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
const createJsonFile = async () => {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("reports");
    const data = await collection.find({}).toArray();
    fs.writeFile(
      path.join(__dirname, "..", "..", "data", "data.json"),
      JSON.stringify(data),
      (err) => {
        resolve();
        console.log(err);
      }
    );
  });
};

// Backup API
app.http("Backup", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    await createJsonFile();
    const blobName = `data-${Date.now()}.json`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const filePath = path.join(__dirname, "..", "..", "data", "data.json");

    try {
      await blockBlobClient.uploadFile(`${filePath}`);
      return {
        body: `${JSON.stringify({ message: "File uploaded successfully" })}`,
      };
    } catch (error) {
      console.log(error);
      return { body: `${JSON.stringify({ message: "Something went wrong" })}` };
    }
  },
});
