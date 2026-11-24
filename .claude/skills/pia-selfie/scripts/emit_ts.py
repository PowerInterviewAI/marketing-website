"""Write src/config/testimonials.samples.ts from spec.py.

Usage: python -I emit_ts.py <spec.py> <out.ts> [public_dir]
Only entries whose selfie exists as <public_dir>/<id>-sample.jpg are written, so
the site never references a missing image and you can ship in batches.
"""
import json, random, sys, pathlib

ns = {}
exec(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"), ns)
pub = pathlib.Path(sys.argv[3] if len(sys.argv) > 3 else "public/media/testimonials")
spec = {e[0]: e for e in ns["SPEC"] if (pub / f"{e[0]}-sample.jpg").exists()}

# First six are the ones shown before "Show all": one of each mode, several languages.
FEATURED = ["maya", "ben", "alex", "lucia", "dmitry", "seoyeon"]
FEATURED = [k for k in FEATURED if k in spec]
rest = [k for k in spec if k not in FEATURED]
random.Random(7).shuffle(rest)
order = FEATURED + rest

def js(v):
    return json.dumps(v, ensure_ascii=False).replace(" ", "\\u2028")

lines = [
    "// GENERATED for the demo/testimonials branch (school project). DO NOT MERGE INTO main.",
    "//",
    "// Every entry below is FICTIONAL: the names, quotes, ratings and the ComfyUI-generated",
    "// selfies under public/media/testimonials/ do not depict real people or real customers.",
    "// Each card renders a visible \"Fictional example\" badge because of `sample: true`.",
    "import type { Testimonial } from './testimonials';",
    "",
    "export const SAMPLE_TESTIMONIALS: Testimonial[] = [",
]
for k in order:
    _id, name, role, lang, mode, rating, _look, _scene, quote = spec[k]
    lines += [
        "  {",
        f"    quote: {js(quote)},",
        f"    name: {js(name)},",
        f"    role: {js(role)},",
        f"    lang: {js(lang)},",
        f"    mode: {js(mode)},",
        f"    rating: {rating},",
        f"    avatar: '/media/testimonials/{_id}-sample.jpg',",
        "    sample: true,",
        "  },",
    ]
lines += ["];", ""]
pathlib.Path(sys.argv[2]).write_text("\n".join(lines), encoding="utf-8", newline="\n")
print(len(order), "entries written")
