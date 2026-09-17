const {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel
} = require("@qvac/sdk");

async function main() {
  console.log("Loading QVAC model...");

  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0
  });

  console.log("Model loaded!");
  console.log("Asking AI...");

  const result = completion({
    modelId,
    history: [
      {
        role: "user",
        content: "What is the capital of the Philippines?"
      }
    ],
    stream: true
  });

  for await (const token of result.tokenStream) {
    process.stdout.write(token);
  }

  await unloadModel({ modelId });
}

main().catch(console.error);
