export default function DualCta() {
  return (
    <div className="dual-cta reveal" style={{ padding: 0 }}>
      <div className="dp dp-brands">
        <span className="dp-icon">🏢</span>
        <h3>Are You a Brand?</h3>
        <p>Launch campaigns with India&apos;s top creators. Data-driven creator selection, real-time measurement, and a team that treats your budget like their own.</p>
        <a href="/for-brands" className="btn btn-y">START YOUR CAMPAIGN →</a>
      </div>
      <div className="dp dp-creators">
        <span className="dp-icon">🌟</span>
        <h3>Are You a Creator?</h3>
        <p>We have access to 7,50,000 creators. Get discovered by India&apos;s biggest brands, access exclusive campaigns, and get paid — on time, every time.</p>
        <a href="/for-creators" className="btn btn-o">JOIN AS A CREATOR →</a>
      </div>
    </div>
  );
}