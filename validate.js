const supported = semver(0, 1, 0);

/**
 * Usage:
 *
 * const err = validate(spec)
 * if (err) {
 *   console.log('Invalid pet:', err)
 * }
 */
export function validate(spec) {
  if (!spec) return `invalid`;
  if (!spec.type) return `missing 'type' attribute`;
  if (spec.type !== "M3_pet") return `invalid 'type' attribute`;
  if (!Array.isArray(spec.version)) return `invalid 'version' attribute`;
  if (!isNumber(spec.version[0])) return `invalid 'version' attribute`;
  if (!isNumber(spec.version[1])) return `invalid 'version' attribute`;
  if (!isNumber(spec.version[2])) return `invalid 'version' attribute`;
  const version = semver(...spec.version);
  if (version.isGreaterThan(supported)) return `unsupported version`;
  if (!spec.name) return `missing 'name' attribute`;
  if (!spec.description) return `missing 'description' attribute`;
  if (!spec.model) return `missing 'model' attribute`;
  if (!spec.model.startsWith("http")) return `invalid 'model' url`;
  if (!spec.model.endsWith(".glb")) return `invalid 'model' url`;
  if (!isNumber(spec.speed)) return `invalid 'speed' attribute`;
  if (!isNumber(spec.near)) return `invalid 'near' attribute`;
  if (!isNumber(spec.far)) return `invalid 'far' attribute`;
  if (!spec.emotes) spec.emotes = [];
  for (const emote of spec.emotes) {
    if (!emote.name) return `missing emote 'name' attribute`;
    if (!emote.animation) return `missing emote 'animation' attribute`;
    if (emote.audio) {
      if (!emote.audio.startsWith("http")) {
        return `invalid emote 'audio' attribute`;
      }
    }
  }
}

function isNumber(n) {
  return !isNaN(n);
}

function semver(major, minor, patch) {
  const isEqual = (other) => {
    return (
      major === other.major && minor === other.minor && patch === other.patch
    );
  };
  const isGreaterThan = (other) => {
    if (major > other.major) return true;
    if (major < other.major) return false;
    if (minor > other.minor) return true;
    if (minor < other.minor) return false;
    return patch > other.patch;
  };
  const isLessThan = (other) => {
    if (major < other.major) return true;
    if (major > other.major) return false;
    if (minor < other.minor) return true;
    if (minor > other.minor) return false;
    return patch < other.patch;
  };
  return {
    major,
    minor,
    patch,
    isEqual,
    isGreaterThan,
    isLessThan,
  };
}
