import fs from "node:fs/promises";

const filePath = "userdata.json";

async function createFile(content) {
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log("JSON file created successfully");
  } catch (err) {
    console.error("Error creating JSON file:", err.message);
  }
}

async function readFile() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log("JSON data:", data);
  } catch (err) {
    console.error("Error reading JSON file:", err.message);
  }
}

async function appendFile(content) {
  try {
    await fs.appendFile(filePath, content, "utf-8");
    console.log("JSON file appended successfully");
  } catch (err) {
    console.error("Error appending JSON file:", err.message);
  }
}

async function deleteFile() {
  try {
    await fs.unlink(filePath);
    console.log("JSON file deleted successfully");
  } catch (err) {
    console.error("Error deleting JSON file:", err.message);
  }
}

async function demo() {
  await createFile('{"name":"Adarsh"}\n');
  await appendFile('{"role":"student"}\n');
  await readFile();
  await deleteFile();
}

demo();
