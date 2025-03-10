//* ========================================================================
//* =================== Dealing With Files & Streams =======================
//* ========================================================================

// // File System Module
// const fs = require("node:fs");

// // * Read File
// // ReadFileSync => Blocking Code (Synchronus)
// const fileContent = fs.readFileSync("./test.txt", "utf-8");
// console.log(fileContent);

// // * ReadFile => Non-Blocking Code (Asynchronus)
// fs.readFile("./test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("Error Reading File", err);
//   } else {
//     console.log("File Content =>", data);
//   }
// });

// // * Write To File
// const data = JSON.stringify([{ id: 1, name: "Ahmed" }]);
// fs.writeFile("./users.json", data, "utf-8", (err) => {
//   if (err) {
//     console.log("something went wrong", err);
//   }
//   console.log("Done");
// });

// // * Delete File
// fs.unlink("./users.json", (err) => {
//   if (err) console.log("something went wrong", err);
//   console.log("Done");
// });

// const buf = Buffer.from("hello world");
// console.log(buf);
// console.log(buf.toString("base64"));

//* ========================================================================
//* ================================= Streams ==============================

// // streams => Readable & Writable

// const rStream = fs.createReadStream("./test.txt", {
//   encoding: "utf8",
//   highWaterMark: 1024 * 1, // 1 KB (the default is 64 KB);
// });

// const wStream = fs.createWriteStream("./test_clone.txt");

// rStream.on("data", (chunk) => {
//   console.log("====================================================\n");
//   console.log(chunk);
//   wStream.write("############################################");
//   wStream.write(chunk);
// });
//* ========================================================================
