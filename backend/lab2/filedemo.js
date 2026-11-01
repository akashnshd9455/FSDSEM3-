import fs from "node:fs/promises";

const filePath = "userdata.txt";

async function createFile(content) {
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log("File created successfully");
  } catch (err) {
    console.error("Error creating file:", err.message);
  }
}

async function readFile() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log("File contents:", data);
  } catch (err) {
    console.error("Error reading file:", err.message);
  }
}

async function appendFile(content) {
  try {
    await fs.appendFile(filePath, content, "utf-8");
    console.log("File appended successfully");
  } catch (err) {
    console.error("Error appending file:", err.message);
  }
}

async function deleteFile() {
  try {
    await fs.unlink(filePath);
    console.log("File deleted successfully");
  } catch (err) {
    console.error("Error deleting file:", err.message);
  }
}

async function demo() {
  await createFile("Hello world\n");
  await appendFile("Hello Adarsh\n");
  await readFile();
  await deleteFile();
}

demo();
