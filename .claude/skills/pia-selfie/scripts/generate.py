"""Generate realistic phone-selfie images for every entry in spec.py via local ComfyUI.

Usage: python -I generate.py <spec.py> <out_dir> [id ...]   (ids are generated in the order given)
Skips images that already exist, so it can be re-run after an interruption.
"""
import json, sys, time, zlib, urllib.request, urllib.parse, pathlib

HOST = "http://127.0.0.1:8188"
spec_path, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
only = set(sys.argv[3:])
out.mkdir(parents=True, exist_ok=True)
ns = {}
exec(spec_path.read_text(encoding="utf-8"), ns)

COMMON = ("close-up head and shoulders framing, the face is large and fills most of the frame, {angle}, {mood}, slightly off-center imperfect framing, ordinary everyday {light}, "
          "real-life background slightly out of focus, natural skin texture, uneven skin tone, natural untidy hair, "
          "no makeup filter, no retouching, mild digital noise, slight jpeg compression, "
          "looks like an unedited real photo, not a professional photo, not a model, not a studio, "
          "casual personal clothes, no ID badge, no lanyard, no name tag, no logos, no readable text")

# Three kinds of selfie. The camera is never visible in its own picture.
PHONE = ("a real candid selfie photo taken on a smartphone front camera, the phone itself is not visible, {pose}, "
         "smartphone wide-angle lens distortion, ")
PHONE_POSES = [
    "front camera held at arm's length, one arm extended toward the camera leaving the frame at the bottom corner, the hand holding the phone is outside the frame",
    "front camera selfie, the free hand casually touching the hair",
    "front camera selfie while walking, slight motion, body turned sideways",
    "front camera selfie leaning back in a chair, relaxed posture",
    "front camera selfie lying down on a couch or bed, camera above the face",
    "front camera selfie with chin resting on the free hand",
    "front camera selfie looking back over the shoulder",
]
# Webcam shots: describe only what the lens sees. Naming the hardware ("webcam", "laptop",
# "monitor", "screen") makes the model draw the device and the person *on* its display.
LAPTOP = ("a real candid photo of a person sitting close to the camera at eye level, the camera about 50 cm "
          "in front of the face and slightly below it so the view looks a little up, {pose}, "
          "the person looks straight into the lens as if on a video call, hands out of frame, "
          "slightly soft focus, low resolution video call image quality, cool bluish light falling on the face from the front, ")
LAPTOP_POSES = [
    "head and shoulders, sitting upright",
    "leaning in a little, smiling",
    "sitting cross-legged on a bed, relaxed",
    "leaning back slightly with arms crossed",
]
PC = ("a real candid photo of a person sitting in a desk chair about 70 cm from the camera, the camera slightly above "
      "eye level looking a little down, {pose}, the person looks straight into the lens as if on a video call, "
      "slightly washed-out colors, video call image quality, part of the room visible behind, ")
PC_POSES = [
    "head and upper body, headphones around the neck",
    "leaning back in the chair, relaxed",
    "turned slightly sideways in the chair",
    "wearing over-ear headphones, smiling",
]

GLAM_STYLE = ("dressed up for a night out, attractive and well groomed, flattering warm light, confident flirty smile, "
              "fully clothed, tasteful")
NEG = ("phone visible in the hand, smartphone in frame, mirror, laptop, computer monitor, screen, display, "
       "screen bezel, photo of a screen, image shown on a monitor, keyboard, webcam, picture frame border, moire, ID badge, lanyard, name tag, logo, text, watermark, "
       "plastic skin, airbrushed, cgi, 3d render, illustration, painting, studio lighting, professional photoshoot, "
       "cleavage, lingerie, nudity, suggestive pose, extra fingers, deformed hands, distorted face, asymmetrical eyes, blurry face")
ANGLES = ["slightly high angle looking down at the camera", "straight-on at eye level", "slightly low angle from chest height",
          "head tilted a little to one side", "close-up with face filling most of the frame"]
MOODS = ["natural relaxed smile", "big genuine grin", "small tired but happy smile", "laughing mid-moment", "soft closed-mouth smile"]
LIGHTS = ["indoor light", "daylight from a window", "overcast daylight", "warm evening light", "mixed fluorescent light"]

def prompt(entry):
    _id, _n, _r, _l, _m, _s, look, scene, _q = entry
    h = zlib.crc32(_id.encode())
    glam = ns.get("GLAM", {}).get(_id)
    if glam:
        look, scene = glam
    kind = {"phone": 0, "laptop": 1, "pc": 2}[ns.get("CAMERA", {}).get(_id, "phone")]
    head, poses = [(PHONE, PHONE_POSES), (LAPTOP, LAPTOP_POSES), (PC, PC_POSES)][kind]
    base = head.format(pose=poses[(h >> 9) % len(poses)]) + COMMON.format(
        angle=ANGLES[h % 5], mood=MOODS[(h >> 3) % 5], light=LIGHTS[(h >> 6) % 5])
    if glam:
        base += ", " + GLAM_STYLE
    return f"{base}. The person is a {look}, {scene}.", h

def wf(text, seed):
    return {
        "1": {"class_type": "UNETLoader", "inputs": {"unet_name": "qwen_image_edit_2511_fp8mixed.safetensors", "weight_dtype": "default"}},
        "2": {"class_type": "LoraLoaderModelOnly", "inputs": {"model": ["1", 0], "lora_name": "Qwen-Image-Edit-2511-Lightning-4steps-V1.0-bf16.safetensors", "strength_model": 1.0}},
        "3": {"class_type": "ModelSamplingAuraFlow", "inputs": {"model": ["1", 0], "shift": 3.1}},
        "4": {"class_type": "CLIPLoader", "inputs": {"clip_name": "qwen_2.5_vl_7b_fp8_scaled.safetensors", "type": "qwen_image", "device": "default"}},
        "5": {"class_type": "VAELoader", "inputs": {"vae_name": "qwen_image_vae.safetensors"}},
        "6": {"class_type": "TextEncodeQwenImageEditPlus", "inputs": {"clip": ["4", 0], "vae": ["5", 0], "prompt": text}},
        "7": {"class_type": "TextEncodeQwenImageEditPlus", "inputs": {"clip": ["4", 0], "vae": ["5", 0], "prompt": NEG}},
        "8": {"class_type": "EmptySD3LatentImage", "inputs": {"width": 896, "height": 1152, "batch_size": 1}},
        "9": {"class_type": "KSampler", "inputs": {"model": ["3", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["8", 0],
                                                  "seed": seed, "steps": 30, "cfg": 3.0, "sampler_name": "euler", "scheduler": "simple", "denoise": 1.0}},
        "10": {"class_type": "VAEDecode", "inputs": {"samples": ["9", 0], "vae": ["5", 0]}},
        "11": {"class_type": "SaveImage", "inputs": {"images": ["10", 0], "filename_prefix": "testimonial_selfie"}},
    }

def post(path, data):
    req = urllib.request.Request(HOST + path, json.dumps(data).encode(), {"Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req))

by_id = {e[0]: e for e in ns["SPEC"]}
order = sys.argv[3:] or list(by_id)
todo = [by_id[i] for i in order if not (out / f"{i}.png").exists()]
print(f"{len(todo)} to generate", flush=True)
for n, e in enumerate(todo, 1):
    text, seed = prompt(e)
    pid = post("/prompt", {"prompt": wf(text, seed)})["prompt_id"]
    t0 = time.time()
    while True:
        hist = json.load(urllib.request.urlopen(f"{HOST}/history/{pid}"))
        if pid in hist:
            h = hist[pid]
            if h.get("status", {}).get("status_str") == "error":
                print(f"{e[0]} FAILED {json.dumps(h['status'])[:400]}", flush=True)
                break
            imgs = h["outputs"].get("11", {}).get("images")
            if imgs:
                q = urllib.parse.urlencode(imgs[0])
                (out / f"{e[0]}.png").write_bytes(urllib.request.urlopen(f"{HOST}/view?{q}").read())
                print(f"[{n}/{len(todo)}] {e[0]} {time.time()-t0:.0f}s", flush=True)
                break
        time.sleep(1.5)
