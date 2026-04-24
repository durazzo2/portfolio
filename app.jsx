/* Teodor Duracoski — Portfolio app */

const { useState, useEffect, useMemo, useRef } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "rose",
  "paperTone": "cream",
  "grainIntensity": 55,
  "tiltPolaroids": true,
  "showPostmark": true,
  "headerFont": "slab"
} /*EDITMODE-END*/;

function App() {
  const [tweaks, setTweaks] = useTweaks(DEFAULTS);
  const [hovered, setHovered] = useState(null);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  // Apply tweaks to CSS vars
  useEffect(() => {
    const root = document.documentElement;
    const tones = {
      cream: { paper: "#f2e8d0", deep: "#e9dcbb" },
      ecru: { paper: "#ece2c6", deep: "#ddd0ad" },
      bone: { paper: "#f5efde", deep: "#ebe3c9" },
      peach: { paper: "#f4e2cc", deep: "#e9d1b0" }
    };
    const t = tones[tweaks.paperTone] || tones.cream;
    root.style.setProperty("--paper", t.paper);
    root.style.setProperty("--paper-deep", t.deep);

    const accents = {
      rose: "#c8766a",
      mustard: "#d9a33f",
      sage: "#8a9a6b"
    };
    root.style.setProperty("--rose", accents[tweaks.accent] || accents.rose);

    const grain = document.querySelector("#grain-style");
    if (grain) {
      grain.textContent = `body::before{opacity:${(tweaks.grainIntensity / 100).toFixed(2)} !important;}`;
    }
    const fonts = {
      slab: `"Alfa Slab One", "Rozha One", Georgia, serif`,
      rozha: `"Rozha One", Georgia, serif`,
      dm: `"DM Serif Display", Georgia, serif`
    };
    root.style.setProperty("--slab", fonts[tweaks.headerFont] || fonts.slab);
  }, [tweaks]);

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric"
  }).toUpperCase();

  return (
    <div className="page">
      <style id="grain-style"></style>

      <Topbar dateStr={dateStr} />

      <Hero />

      <section id="experience" className="section" data-screen-label="Experience">
        <div className="section-head">
          <div className="num">§ 01 — Work History</div>
          <h2>Experience</h2>
          <div className="meta">on file · 2026 → now</div>
        </div>
        <Newspaper />
      </section>

      <section id="work" className="section" data-screen-label="Projects">
        <div className="section-head">
          <div className="num">§ 02 — Selected Work</div>
          <h2>Projects</h2>
          <div className="meta">3 builds · 2023–2025</div>
        </div>
        <div className={"polaroid-grid" + (tweaks.tiltPolaroids ? "" : " no-tilt")}>
          {projects.map((p) =>
          <Polaroid key={p.id} project={p} hovered={hovered === p.id} onHover={setHovered} />
          )}
        </div>
      </section>

      <section id="contact" className="section" data-screen-label="Contact">
        <div className="section-head">
          <div className="num">§ 03 — Say Hello</div>
          <h2>Contact</h2>
          <div className="meta">hand-delivered replies</div>
        </div>
        <Contact showPostmark={tweaks.showPostmark} />
      </section>

      <footer className="foot">
        <div>© TD · {time.getFullYear()}</div>
        <div className="ticker">
          <div className="ticker-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span className="ticker-phrase" key={i}>
                SKOPJE <i className="star"></i> AI DEV @ CRAZYLABS <i className="star mustard"></i> CURRENTLY SHIPPING <i className="star sage"></i>
              </span>
            ))}
          </div>
        </div>
        <div>
</div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio label="Accent"
          value={tweaks.accent}
          onChange={(v) => setTweaks({ accent: v })}
          options={[
          { value: "rose", label: "Dusty Rose" },
          { value: "mustard", label: "Mustard" },
          { value: "sage", label: "Sage" }]
          } />
          
          <TweakRadio
            label="Paper tone"
            value={tweaks.paperTone}
            onChange={(v) => setTweaks({ paperTone: v })}
            options={[
            { value: "cream", label: "Cream" },
            { value: "ecru", label: "Ecru" },
            { value: "bone", label: "Bone" },
            { value: "peach", label: "Peach" }]
            } />
          
        </TweakSection>

        <TweakSection title="Texture">
          <TweakSlider
            label="Grain intensity"
            value={tweaks.grainIntensity}
            onChange={(v) => setTweaks({ grainIntensity: v })}
            min={0} max={100} step={1} />
          
        </TweakSection>

        <TweakSection title="Layout">
          <TweakToggle
            label="Tilt polaroids"
            value={tweaks.tiltPolaroids}
            onChange={(v) => setTweaks({ tiltPolaroids: v })} />
          
          <TweakToggle
            label="Postcard postmark"
            value={tweaks.showPostmark}
            onChange={(v) => setTweaks({ showPostmark: v })} />
          
        </TweakSection>

        <TweakSection title="Typography">
          <TweakRadio
            label="Header font"
            value={tweaks.headerFont}
            onChange={(v) => setTweaks({ headerFont: v })}
            options={[
            { value: "slab", label: "Alfa Slab (chunky)" },
            { value: "rozha", label: "Rozha (elegant)" },
            { value: "dm", label: "DM Serif (classic)" }]
            } />
          
        </TweakSection>
      </TweaksPanel>
    </div>);

}

function Topbar({ dateStr }) {
  return (
    <div className="topbar">
      <div><span className="dot"></span>TD · PORTFOLIO — EST. 2024</div>
      <div className="bar-right">
        <a href="#experience">Experience</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
      <div>{dateStr}</div>
    </div>);

}

function Hero() {
  return (
    <header className="hero">
      <div className="eyebrow">
        <span className="blink"></span> AVAILABLE · BUILDING AT CRAZYLABS
      </div>

      <h1 className="name">
        Teodor<br />
        <span className="duracoski">
          Duracoski
          <span className="underline"></span>
        </span>
      </h1>

      <div className="title-line">
        <div className="title-stamp">AI Developer</div>
        <div className="title-meta"><span className="tick">●</span> turns real problems into real software</div>
      </div>

      <p className="bio">
        AI Developer at <strong>CrazyLabs</strong> — working on LLMs, generative AI, and internal tools that automate
        real work. Early in my career, but already convinced the best AI solutions start with understanding the problem,
        not reaching for the technology.
      </p>

      <div className="hero-marks" aria-hidden="true">
        <div className="stamp">№ 001 / PORTFOLIO</div>
        <div className="stamp sage">FILED UNDER: ENGINEER</div>
      </div>
    </header>);

}

function Polaroid({ project, hovered, onHover }) {
  const chipColors = ["chip", "chip rose", "chip mustard", "chip sage", "chip"];
  return (
    <a
      className="polaroid"
      href={project.github}
      target="_blank"
      rel="noopener"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      style={{ textDecoration: "none", color: "inherit" }}>
      
      <span className="tape"></span>
      <div className="photo">
        <Photo motif={project.motif} palette={project.palette} />
      </div>
      <div className="caption">
        <div className="row">
          <h3>{project.title}</h3>
          <span className="year">{project.year}</span>
        </div>
        <p>{project.description}</p>
        <div className="stack">
          {project.stack.map((s, i) =>
          <span key={s} className={chipColors[i % chipColors.length]}>{s}</span>
          )}
        </div>
        <div className="actions">
          <span className="gh">
            View on GitHub <span className="arrow">↗</span>
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-soft)" }}>
            {hovered ? "CLICK →" : `· ${project.id.toUpperCase()} ·`}
          </span>
        </div>
      </div>
    </a>);

}

function Newspaper() {
  return (
    <div className="newspaper">
      <div className="masthead">
        <div className="title">THE DURACOSKI DAILY</div>
        <div className="sub">Career Edition · All the news that fits in print</div>
      </div>
      <div className="columns">
        <NewsItem item={experience[0]} />
        <div className="divider"></div>
        <NewsItem item={experience[1]} />
      </div>
    </div>);

}

function NewsItem({ item }) {
  return (
    <article className="news-item">
      <div className="byline">{item.byline} · {item.when}</div>
      <h3>{item.role}<br /><span style={{ color: "var(--ink-soft)", fontSize: "0.7em" }}>at {item.company}</span></h3>
      <p className="dek">{item.body}</p>
      {item.tags && item.tags.length > 0 &&
      <div className="badge-row">
          {item.tags.map((t, i) =>
        <span key={t} className={"chip" + (i === 0 ? " mustard" : i === 1 ? " sage" : "")}>{t}</span>
        )}
        </div>
      }
    </article>);

}

function Contact({ showPostmark }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText("teodurac@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="contact-grid single">
      <div className="postcard" style={{ width: "1000px" }}>
        <div className="pc-head">
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--ink-soft)" }}>SEND TO</div>
            <h3>Teodor Duracoski</h3>
          </div>
          <div className="to">POSTCARD · NO. 001</div>
        </div>

        <p style={{ fontFamily: "var(--mono)", fontSize: 14, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 22px" }}>
          Replies arrive in plain English, usually within a day. Best reached by email, but I check everything.
          If you're hiring, building, or want to compare notes on LLM evals — write.
        </p>

        <ul className="contact-list">
          <li>
            <a href="mailto:teodurac@gmail.com" onClick={copyEmail}>
              <span className="ico">@</span>
              <span className="label">teodurac@gmail.com</span>
              <span className="arrow">{copied ? "copied ✓" : "→"}</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/durazzo2" target="_blank" rel="noopener">
              <span className="ico">GH</span>
              <span className="label">github.com/durazzo2</span>
              <span className="arrow">↗</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/teodor-duracoski/" target="_blank" rel="noopener">
              <span className="ico">in</span>
              <span className="label">linkedin.com/in/teodor-duracoski</span>
              <span className="arrow">↗</span>
            </a>
          </li>
          <li>
            <a href="https://leetcode.com/u/durazzo/" target="_blank" rel="noopener">
              <span className="ico">LC</span>
              <span className="label">leetcode.com/u/durazzo</span>
              <span className="arrow">↗</span>
            </a>
          </li>
        </ul>

        {showPostmark &&
        <div className="postmark">
            SKOPJE<br />· 2026 ·<br />PAR AVION
          </div>
        }
      </div>
    </div>);

}

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(<App />);