type GenerationParameters = {
  [key: string]: string | string[] | number;
};

/**
parses generation parameters string, the one you see in text field under the picture in UI:
```md
girl with an artist's beret, determined, blue eyes, desert scene, computer monitors, heavy makeup, by Alphonse Mucha and Charlie Bowater, ((eyeshadow)), (coquettish), detailed, intricate
Negative prompt: ugly, fat, obese, chubby, (((deformed))), [blurry], bad anatomy, disfigured, poorly drawn face, mutation, mutated, (extra_limb), (ugly), (poorly drawn hands), messy drawing
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 965400086, Size: 512x512, Model hash: 45dee52b
```
returns a dict with field values

NOTE: code from: modules\generation_parameters_copypaste.py
 */
export function parseGenerationParameters(x: string): GenerationParameters {
  const result_params: GenerationParameters = {
    "Clip skip": "1",
    "Hires resize-1": 0,
    "Hires resize-2": 0,
    "Hires sampler": "Use same sampler",
    "Hires checkpoint": "Use same checkpoint",
    "Hires prompt": "",
    "Hires negative prompt": "",
    RNG: "GPU",
    "Schedule type": "Automatic",
    "Schedule max sigma": 0,
    "Schedule min sigma": 0,
    "Schedule rho": 0,
    "VAE Encoder": "Full",
    "VAE Decoder": "Full",
  };
  let prompt = "";
  let negativePrompt = "";
  let doneWithPrompt = false;

  const lines = x.trim().split("\n");
  let lastLine = lines.pop() || "";

  const reParam: RegExp =
    /\s*(\w[\w \-/]+):\s*("(?:\\.|[^\\"])+"|[^,]*)(?:,|$)/g;
  const reImageSize: RegExp = /^(\d+)x(\d+)$/g;

  if (reParam.test(lastLine) === false) {
    lines.push(lastLine);
    lastLine = "";
  }

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("Negative prompt:")) {
      doneWithPrompt = true;
      line = line.substring(16).trim();
    }
    if (doneWithPrompt) {
      negativePrompt += (negativePrompt === "" ? "" : "\n") + line;
    } else {
      prompt += (prompt === "" ? "" : "\n") + line;
    }
  }

  result_params["Prompt"] = prompt;
  result_params["Negative prompt"] = negativePrompt;

  let match;
  while ((match = reParam.exec(lastLine)) !== null) {
    let [, k, v] = match;
    k = k.trim();
    v = v.trim();
    try {
      if (v[0] === '"' && v[v.length - 1] === '"') {
        v = decodeURIComponent(v);
      }

      let m = reImageSize.exec(v);
      if (m !== null) {
        result_params[`${k}-1`] = m[1];
        result_params[`${k}-2`] = m[2];
      } else {
        result_params[k] = v;
      }
    } catch (e) {
      console.error(`Error parsing "${k}: ${v}"`);
    }
  }

  // Special case for Hypernet
  if (result_params["Hypernet"] !== undefined) {
    result_params["Prompt"] += `<hypernet:${result_params["Hypernet"]}:${
      result_params["Hypernet strength"] || "1.0"
    }>`;
  }

  return result_params;
}
