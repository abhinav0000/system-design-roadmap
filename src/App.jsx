import { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Foundation Reset",
    subtitle: "Weeks 1–3",
    color: "#4ADE80",
    textColor: "#052e16",
    icon: "⚡",
    description: "Solidify the mental models you need before diving into design.",
    topics: [
      {
        name: "Networking Essentials",
        type: "HLD",
        items: ["HTTP/HTTPS, TCP/UDP, DNS", "REST vs GraphQL vs gRPC", "WebSockets & Long Polling", "CDN & Edge Networks"],
        resources: ["High Scalability Blog", "ByteByteGo Newsletter"]
      },
      {
        name: "OS & Concurrency Basics",
        type: "Both",
        items: ["Processes vs Threads", "Locks, Semaphores, Deadlocks", "Async I/O & Event Loops", "Memory management basics"],
        resources: ["Operating Systems: Three Easy Pieces (free)"]
      },
      {
        name: "Data Structures for Design",
        type: "LLD",
        items: ["Hash maps, Trees, Graphs at scale", "Bloom Filters, Skip Lists", "When to use what", "Time/Space complexity intuition"],
        resources: ["Leetcode Explore", "Grokking Algorithms"]
      }
    ]
  },
  {
    id: 2,
    title: "HLD Core",
    subtitle: "Weeks 4–8",
    color: "#60A5FA",
    textColor: "#0c1445",
    icon: "🏗️",
    description: "Learn to design systems that scale to millions of users.",
    topics: [
      {
        name: "Scalability Patterns",
        type: "HLD",
        items: ["Horizontal vs Vertical Scaling", "Load Balancers (L4 vs L7)", "Consistent Hashing", "Sharding & Partitioning strategies"],
        resources: ["Designing Data-Intensive Applications (Kleppmann)", "System Design Primer (GitHub)"]
      },
      {
        name: "Storage Systems",
        type: "HLD",
        items: ["SQL vs NoSQL decision framework", "CAP Theorem & BASE", "Replication: master-slave, multi-master", "Caching layers: Redis, Memcached", "Indexing strategies"],
        resources: ["CMU Database Course (free)", "ByteByteGo Book"]
      },
      {
        name: "Messaging & Async",
        type: "HLD",
        items: ["Message Queues: Kafka, RabbitMQ", "Event-Driven Architecture", "SAGA pattern for distributed txns", "Idempotency & At-least-once delivery"],
        resources: ["Confluent Kafka docs", "Martin Fowler's blog"]
      },
      {
        name: "Practice: HLD Problems",
        type: "HLD",
        items: ["Design URL Shortener", "Design Twitter Feed", "Design WhatsApp / Chat System", "Design YouTube / Video Streaming", "Design Uber / Ride Sharing"],
        resources: ["Grokking System Design (Educative)", "Exponent YouTube", "NeetCode System Design"]
      }
    ]
  },
  {
    id: 3,
    title: "LLD Core",
    subtitle: "Weeks 9–13",
    color: "#F59E0B",
    textColor: "#1c0a00",
    icon: "🔩",
    description: "Learn to write clean, extensible, maintainable code architecture.",
    topics: [
      {
        name: "OOP Mastery",
        type: "LLD",
        items: ["SOLID Principles (deeply, not superficially)", "Composition over Inheritance", "Dependency Injection", "Interface segregation in practice"],
        resources: ["Clean Code – Robert Martin", "Head First Design Patterns"]
      },
      {
        name: "Design Patterns",
        type: "LLD",
        items: [
          "Creational: Singleton, Factory, Builder, Prototype",
          "Structural: Adapter, Decorator, Facade, Proxy",
          "Behavioral: Observer, Strategy, Command, Iterator, State",
          "When NOT to use a pattern"
        ],
        resources: ["Refactoring.Guru (free)", "Gang of Four book"]
      },
      {
        name: "UML & Diagrams",
        type: "LLD",
        items: ["Class Diagrams", "Sequence Diagrams", "Use Case Diagrams", "ER Diagrams for schema design"],
        resources: ["PlantUML tool", "Draw.io for practice"]
      },
      {
        name: "Practice: LLD Problems",
        type: "LLD",
        items: ["Design a Parking Lot", "Design an Elevator System", "Design a Library Management System", "Design a Chess Game", "Design a Splitwise / Expense Tracker", "Design Amazon Locker"],
        resources: ["Grokking OOD (Educative)", "Ashish Pratap Singh (YouTube)"]
      }
    ]
  },
  {
    id: 4,
    title: "Advanced & Integration",
    subtitle: "Weeks 14–18",
    color: "#C084FC",
    textColor: "#1a0030",
    icon: "🚀",
    description: "Combine both disciplines and prepare for senior-level interviews.",
    topics: [
      {
        name: "Advanced HLD",
        type: "HLD",
        items: ["Microservices vs Monolith tradeoffs", "Service Mesh (Istio)", "API Gateway patterns", "Distributed Tracing & Observability", "Rate Limiting algorithms (Token Bucket, Leaky Bucket)"],
        resources: ["Sam Newman – Building Microservices"]
      },
      {
        name: "Advanced LLD",
        type: "LLD",
        items: ["Clean Architecture (Hexagonal / Onion)", "Domain-Driven Design basics", "Repository & Unit of Work pattern", "CQRS pattern", "Event Sourcing"],
        resources: ["Clean Architecture – Robert Martin", "Domain-Driven Design – Eric Evans"]
      },
      {
        name: "Security in Design",
        type: "Both",
        items: ["Auth: OAuth2, JWT, SSO", "OWASP Top 10 awareness", "Encryption at rest vs in transit", "API Security best practices"],
        resources: ["OWASP.org", "Auth0 docs"]
      },
      {
        name: "Mock Interviews",
        type: "Both",
        items: ["Time yourself: 45 min per problem", "Verbalize your thought process", "Practice clarifying questions first", "Draw diagrams while explaining", "Defend your tradeoffs"],
        resources: ["Pramp.com (free)", "interviewing.io", "Exponent"]
      }
    ]
  }
];

const typeColors = {
  HLD: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  LLD: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  Both: { bg: "#f0fdf4", text: "#166534", border: "#86efac" }
};

export default function LearningPath() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedTopic, setExpandedTopic] = useState(null);

  const phase = phases[activePhase];

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0a0a0f",
      minHeight: "100vh",
      color: "#e8e8f0",
      padding: "0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0f1a2e 100%)",
        borderBottom: "1px solid #2a2a4a",
        padding: "40px 32px 32px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "6px", color: "#6366f1", textTransform: "uppercase", marginBottom: "16px", fontFamily: "monospace" }}>
          SYSTEM DESIGN MASTERY ROADMAP
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: "normal",
          letterSpacing: "-1px",
          margin: "0 0 12px",
          background: "linear-gradient(90deg, #e8e8f0 0%, #a5b4fc 50%, #c084fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          HLD & LLD Learning Path
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", margin: "0", fontFamily: "sans-serif", fontStyle: "italic" }}>
          Tailored for fullstack developers · 18-week structured journey
        </p>

        {/* Phase Pills */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
          {phases.map((p, i) => (
            <button key={p.id} onClick={() => { setActivePhase(i); setExpandedTopic(null); }}
              style={{
                padding: "10px 20px",
                borderRadius: "100px",
                border: `2px solid ${activePhase === i ? p.color : "#2a2a4a"}`,
                background: activePhase === i ? p.color + "20" : "transparent",
                color: activePhase === i ? p.color : "#6b7280",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "sans-serif",
                fontWeight: activePhase === i ? "600" : "400",
                transition: "all 0.2s",
                letterSpacing: "0.5px"
              }}>
              {p.icon} Phase {p.id}: {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Phase Header */}
        <div style={{
          background: "linear-gradient(135deg, #12121e, #1a1a30)",
          border: `1px solid ${phase.color}40`,
          borderRadius: "16px",
          padding: "28px 32px",
          marginBottom: "28px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", right: "-20px", top: "-20px",
            fontSize: "100px", opacity: "0.06", userSelect: "none"
          }}>{phase.icon}</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: phase.color + "20", border: `2px solid ${phase.color}60`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px", flexShrink: 0
            }}>{phase.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "normal", color: phase.color }}>{phase.title}</h2>
                <span style={{
                  background: phase.color + "20", color: phase.color,
                  padding: "3px 12px", borderRadius: "100px", fontSize: "12px",
                  fontFamily: "monospace", letterSpacing: "1px"
                }}>{phase.subtitle}</span>
              </div>
              <p style={{ margin: 0, color: "#9ca3af", fontFamily: "sans-serif", fontSize: "15px" }}>{phase.description}</p>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {phase.topics.map((topic, ti) => {
            const isOpen = expandedTopic === ti;
            const tc = typeColors[topic.type];
            return (
              <div key={ti} style={{
                background: "#12121e",
                border: `1px solid ${isOpen ? phase.color + "60" : "#1e1e35"}`,
                borderRadius: "12px",
                overflow: "hidden",
                transition: "border-color 0.2s"
              }}>
                <button onClick={() => setExpandedTopic(isOpen ? null : ti)}
                  style={{
                    width: "100%", background: "none", border: "none",
                    padding: "20px 24px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "16px"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{
                      background: tc.bg, color: tc.text,
                      padding: "3px 10px", borderRadius: "6px",
                      fontSize: "10px", fontFamily: "monospace",
                      fontWeight: "700", letterSpacing: "1px",
                      border: `1px solid ${tc.border}`, flexShrink: 0
                    }}>{topic.type}</span>
                    <span style={{ color: "#e8e8f0", fontSize: "17px", textAlign: "left", fontWeight: "normal" }}>{topic.name}</span>
                  </div>
                  <span style={{ color: phase.color, fontSize: "20px", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 24px 24px", borderTop: `1px solid #1e1e35` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                      {/* Concepts */}
                      <div>
                        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#4b5563", fontFamily: "monospace", marginBottom: "12px", textTransform: "uppercase" }}>Concepts to Cover</div>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                          {topic.items.map((item, ii) => (
                            <li key={ii} style={{
                              display: "flex", alignItems: "flex-start", gap: "10px",
                              padding: "7px 0", borderBottom: "1px solid #1a1a2e",
                              fontSize: "14px", color: "#d1d5db", fontFamily: "sans-serif",
                              lineHeight: "1.5"
                            }}>
                              <span style={{ color: phase.color, flexShrink: 0, marginTop: "3px", fontSize: "10px" }}>▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Resources */}
                      <div>
                        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#4b5563", fontFamily: "monospace", marginBottom: "12px", textTransform: "uppercase" }}>Resources</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {topic.resources.map((r, ri) => (
                            <div key={ri} style={{
                              background: "#0d0d1a", border: "1px solid #1e1e35",
                              borderRadius: "8px", padding: "10px 14px",
                              fontSize: "13px", color: "#9ca3af", fontFamily: "sans-serif",
                              display: "flex", alignItems: "center", gap: "8px"
                            }}>
                              <span style={{ color: "#4b5563" }}>📚</span> {r}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
          <button onClick={() => { setActivePhase(Math.max(0, activePhase - 1)); setExpandedTopic(null); }}
            disabled={activePhase === 0}
            style={{
              padding: "12px 24px", borderRadius: "8px",
              border: "1px solid #2a2a4a", background: "transparent",
              color: activePhase === 0 ? "#2a2a4a" : "#9ca3af",
              cursor: activePhase === 0 ? "default" : "pointer",
              fontFamily: "sans-serif", fontSize: "14px"
            }}>← Previous Phase</button>
          <button onClick={() => { setActivePhase(Math.min(phases.length - 1, activePhase + 1)); setExpandedTopic(null); }}
            disabled={activePhase === phases.length - 1}
            style={{
              padding: "12px 24px", borderRadius: "8px",
              border: `1px solid ${phase.color}60`,
              background: phase.color + "15",
              color: activePhase === phases.length - 1 ? "#2a2a4a" : phase.color,
              cursor: activePhase === phases.length - 1 ? "default" : "pointer",
              fontFamily: "sans-serif", fontSize: "14px"
            }}>Next Phase →</button>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "40px", flexWrap: "wrap" }}>
          {Object.entries(typeColors).map(([type, tc]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ background: tc.bg, color: tc.text, padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", fontWeight: "700", border: `1px solid ${tc.border}` }}>{type}</span>
              <span style={{ color: "#4b5563", fontSize: "12px", fontFamily: "sans-serif" }}>
                {type === "HLD" ? "High-Level Design" : type === "LLD" ? "Low-Level Design" : "Both"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}