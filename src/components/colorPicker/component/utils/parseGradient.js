function parseColor(str) {
  let p = document.createElement("p");
  p.id = "computedStyle";
  p.className = "hide";
  p.style.color = str;

  document.body.appendChild(p);

  const color = getComputedStyle(p).color;

  document.body.removeChild(p);

  if (!color || color === "none") {
    return null;
  } else {
    return color;
  }
}

function normalizeGradient(str) {
  let p = document.createElement("p");
  p.id = "computedStyle";
  p.className = "hide";
  p.style.backgroundImage = str;

  document.body.appendChild(p);

  let color = getComputedStyle(p).backgroundImage;

  document.body.removeChild(p);

  if (!color || color === "none") {
    return false;
  } else {
    return color;
  }
}

function* matchAll(content, regexp, group = -1) {
  for (let match; (match = regexp.exec(content)); ) {
    yield ~group ? match[group].trim() : match.map((v) => v.trim());
  }
}

function match(content, regexp, group = -1) {
  const match = content.match(regexp);
  return match ? (~group ? match[group] : match) : null;
}

export function parseGradient(str) {
  // Validate gradient
  str = normalizeGradient(str);

  if (!str) {
    return null;
  }

  // Resolve gradient type and stop strings
  const [, type, content] = str.match(/^(\w+)-gradient\((.*)\)$/i) || [];

  if (!type || !content) {
    return null;
  }

  const rawstops = [...matchAll(content, /(rgb *\([^)]+\))\s+(\d+%)/gi)];
  const stops = [];
  let modifier = null;

  // Parse raw stop strings
  let lastColor = null;
  for (let i = 0; i < rawstops.length; i++) {
    const [full, rc, rl] = rawstops[i];
    const color = parseColor(rc);
    const locs = rl
      .split(/\s+/g)
      .map((v) => match(v, /^-?(\d*(\.\d+)?)%$/, 1))
      .filter(Boolean)
      .map(Number);

    if (!locs.length && color) {
      stops.push({ loc: null, color });
    } else if (locs.length) {
      for (const loc of locs) {
        stops.push({
          loc,
          color: color || lastColor,
        });
      }
    } else if (!modifier) {
      modifier = full;
    }

    lastColor = color || lastColor;
  }

  if (!stops[stops.length - 1].loc) {
    stops[stops.length - 1].loc = 100;
  }

  // Compute gaps
  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];

    if (!stop.loc) {
      if (!i) {
        stop.loc = 0;
      } else {
        let divider = 2;
        let j = i + 1;

        for (; j < stops.length && !stops[j].loc; j++) {
          divider++;
        }

        stop.loc =
          stops[i - 1].loc + (stops[j].loc - stops[i - 1].loc) / divider;
      }
    }
  }

  return {
    str,
    type,
    modifier,
    stops,
  };
}
