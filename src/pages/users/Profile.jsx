import { useState } from "react";

const user = {
  name: "Priya Kapoor",
  initials: "PK",
  email: "priya.kapoor@email.com",
  phone: "+91 98765 43210",
  location: "Patna, Bihar",
  memberSince: "March 2022",
  tier: "Gold Member",
  stats: {
    totalOrders: 47,
    totalSpent: "₹68,420",
    rewardPoints: 3250,
    wishlistItems: 12,
  },
  loyaltyProgress: { current: 3250, target: 5000, nextTier: "Platinum" },
  addresses: [
    {
      id: 1,
      label: "Home",
      isDefault: true,
      line: "12, Ashok Nagar, Near Gandhi Maidan, Patna, Bihar – 800001",
    },
    {
      id: 2,
      label: "Office",
      isDefault: false,
      line: "Block C, IT Park, Rajendra Nagar, Patna, Bihar – 800016",
    },
  ],
  orders: [
    {
      id: "ORD-8821",
      name: "Nike Air Max 270",
      icon: "👟",
      date: "Apr 9, 2026",
      price: "₹8,499",
      status: "Delivered",
    },
    {
      id: "ORD-8764",
      name: "Noise ColorFit Pro 5",
      icon: "📱",
      date: "Mar 30, 2026",
      price: "₹3,299",
      status: "In Transit",
    },
    {
      id: "ORD-8612",
      name: "Wildcraft Backpack 45L",
      icon: "🎒",
      date: "Mar 15, 2026",
      price: "₹2,149",
      status: "Delivered",
    },
    {
      id: "ORD-8501",
      name: "Philips Smart Bulb Pack",
      icon: "💡",
      date: "Feb 28, 2026",
      price: "₹1,599",
      status: "Returned",
    },
  ],
  wishlist: [
    {
      id: 1,
      name: "Sony WH-1000XM5 Headphones",
      icon: "🎧",
      category: "Electronics",
      price: "₹26,990",
      added: "Apr 2",
      stock: "In stock",
    },
    {
      id: 2,
      name: "Fabindia Linen Kurta Set",
      icon: "👗",
      category: "Clothing",
      price: "₹3,499",
      added: "Mar 25",
      stock: "Low stock",
    },
    {
      id: 3,
      name: "Instax Mini 12 Camera",
      icon: "📷",
      category: "Photography",
      price: "₹6,999",
      added: "Mar 10",
      stock: "In stock",
    },
  ],
  settings: [
    { label: "Email notifications", value: "Enabled", color: "#16a34a" },
    { label: "Two-factor authentication", value: "Off", color: "#dc2626" },
    { label: "Saved payment methods", value: "2 cards", color: "#6b7280" },
    { label: "Language & region", value: "English · India", color: "#6b7280" },
  ],
};

const statusStyles = {
  Delivered: { bg: "#dcfce7", color: "#166534" },
  "In Transit": { bg: "#dbeafe", color: "#1e40af" },
  Returned: { bg: "#fee2e2", color: "#991b1b" },
  Pending: { bg: "#fef9c3", color: "#854d0e" },
};

const stockStyles = {
  "In stock": { bg: "#dcfce7", color: "#166534" },
  "Low stock": { bg: "#fef9c3", color: "#854d0e" },
  "Out of stock": { bg: "#fee2e2", color: "#991b1b" },
};

function Badge({ label, styles }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        background: styles.bg,
        color: styles.color,
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "#f8f7ff",
        borderRadius: 12,
        padding: "14px 16px",
        flex: "1 1 120px",
      }}
    >
      <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#1e1b4b" }}>{value}</div>
    </div>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const { current, target, nextTier } = user.loyaltyProgress;
  const progressPct = Math.round((current / target) * 100);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f5f3ff",
        minHeight: "100vh",
        padding: "2rem 1rem",
        color: "#1e1b4b",
      }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* ── Header card ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            flexWrap: "wrap",
            boxShadow: "0 2px 12px rgba(99,85,200,0.07)",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#a78bfa,#6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
              letterSpacing: 1,
            }}
          >
            {user.initials}
          </div>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 20, fontWeight: 700 }}>{user.name}</span>
              <span
                style={{
                  background: "#ede9fe",
                  color: "#5b21b6",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 99,
                  letterSpacing: "0.04em",
                }}
              >
                {user.tier}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              {user.email} &nbsp;·&nbsp; {user.phone}
            </p>
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>
              Member since {user.memberSince} &nbsp;·&nbsp; {user.location}
            </p>
          </div>
          <button
            style={{
              padding: "8px 18px",
              borderRadius: 10,
              border: "1.5px solid #e0d9ff",
              background: "transparent",
              color: "#5b21b6",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Edit profile
          </button>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <StatCard label="Total orders" value={user.stats.totalOrders} />
          <StatCard label="Total spent" value={user.stats.totalSpent} />
          <StatCard label="Reward points" value={user.stats.rewardPoints.toLocaleString()} />
          <StatCard label="Wishlist items" value={user.stats.wishlistItems} />
        </div>

        {/* ── Loyalty progress ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 12px rgba(99,85,200,0.07)",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>
            Loyalty progress
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
            <span style={{ fontWeight: 600, color: "#f59e0b" }}>Gold</span>
            <span>{nextTier} at {target.toLocaleString()} pts</span>
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: 99, height: 8, overflow: "hidden", marginBottom: 10 }}>
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
                borderRadius: 99,
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <p style={{ fontSize: 13, color: "#6b7280" }}>
            <strong style={{ color: "#1e1b4b" }}>{(target - current).toLocaleString()} more points</strong> to reach {nextTier} — earn 2× on every order this week.
          </p>
        </div>

        {/* ── Tabs: Orders / Wishlist ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 12px rgba(99,85,200,0.07)",
          }}
        >
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {["orders", "wishlist"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 99,
                  border: "none",
                  background: activeTab === tab ? "#ede9fe" : "transparent",
                  color: activeTab === tab ? "#5b21b6" : "#9ca3af",
                  fontWeight: activeTab === tab ? 700 : 500,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {tab === "orders" ? "Recent Orders" : "Wishlist"}
              </button>
            ))}
          </div>

          {activeTab === "orders" && (
            <div>
              {user.orders.map((order, i) => (
                <div
                  key={order.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 0",
                    borderBottom: i < user.orders.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: "#f8f7ff",
                      border: "1px solid #e9e6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {order.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1e1b4b" }}>{order.name}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>
                      {order.id} &nbsp;·&nbsp; {order.date}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#1e1b4b", marginBottom: 4 }}>{order.price}</p>
                    <Badge label={order.status} styles={statusStyles[order.status] || statusStyles["Pending"]} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              {user.wishlist.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 0",
                    borderBottom: i < user.wishlist.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: "#f8f7ff",
                      border: "1px solid #e9e6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1e1b4b" }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>
                      Added {item.added} &nbsp;·&nbsp; {item.category}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#1e1b4b", marginBottom: 4 }}>{item.price}</p>
                    <Badge label={item.stock} styles={stockStyles[item.stock] || stockStyles["In stock"]} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Saved addresses ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 12px rgba(99,85,200,0.07)",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
            Saved addresses
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {user.addresses.map((addr) => (
              <div key={addr.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b" }}>{addr.label}</span>
                  {addr.isDefault && (
                    <span
                      style={{
                        fontSize: 11,
                        background: "#ede9fe",
                        color: "#5b21b6",
                        padding: "2px 8px",
                        borderRadius: 99,
                        fontWeight: 700,
                      }}
                    >
                      Default
                    </span>
                  )}
                </div>
                <div
                  style={{
                    background: "#f8f7ff",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "#6b7280",
                    lineHeight: 1.7,
                  }}
                >
                  {addr.line}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Account settings ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 12px rgba(99,85,200,0.07)",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>
            Account settings
          </div>
          {user.settings.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < user.settings.length - 1 ? "1px solid #f3f4f6" : "none",
              }}
            >
              <span style={{ fontSize: 14, color: "#374151" }}>{s.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}