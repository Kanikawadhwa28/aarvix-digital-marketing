// No "use client" needed - this section has NO interactivity
// It's just static content that animates via CSS + scroll reveal

const STEPS = [
    {
      num: "01",
      icon: "📋",
      title: "Share Your Brief",
      desc: "Tell us your goals, audience, budget & timeline. Our AI instantly maps the best creators for your brand.",
      delay: "0s",
    },
    {
      num: "02",
      icon: "🔍",
      title: "Discover Creators",
      desc: "Browse curated recommendations or search 7.5L+ verified influencers across every niche and platform.",
      delay: ".1s",
    },
    {
      num: "03",
      icon: "🚀",
      title: "Launch Campaign",
      desc: "Contracts, briefs, approvals, payments — manage everything from one centralised dashboard.",
      delay: ".2s",
    },
    {
      num: "04",
      icon: "📈",
      title: "Measure & Scale",
      desc: "Real-time dashboards show exactly what's working. Scale your best-performing creators and content.",
      delay: ".3s",
    },
  ];
  
  export default function HowItWorks() {
    return (
      <section className="hiw-bg reveal">
        <div className="tc">
          <span className="stag">Process</span>
          <h2 className="sh">
          Your Brand's Reach, <em>Built in 4 Steps</em>
          </h2>
          <span className="gold-bar" />
        </div>
  
        <div className="hiw-grid">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="hiw-step reveal"
              style={{ transitionDelay: step.delay }}
            >
              <div className="hiw-n">{step.num}</div>
              <span className="hiw-icon">{step.icon}</span>
              <div className="hiw-ttl">{step.title}</div>
              <p className="hiw-d">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }