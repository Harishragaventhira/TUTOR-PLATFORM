import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { tutorProfile } from "../../data/dummyData";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  { id: 1, student: "Aryan Gupta", type: "Monthly Tuition", amount: 3500, date: "Mar 20", status: "received" },
  { id: 2, student: "Sneha Joshi", type: "Course Purchase", amount: 1999, date: "Mar 18", status: "received" },
  { id: 3, student: "Platform", type: "Platform Fee", amount: -525, date: "Mar 18", status: "deducted" },
  { id: 4, student: "Mohammed Ali", type: "Monthly Tuition", amount: 3500, date: "Mar 15", status: "received" },
  { id: 5, student: "Riya Kapoor", type: "Course Purchase", amount: 999, date: "Mar 12", status: "received" },
  { id: 6, student: "Platform", type: "Platform Fee", amount: -150, date: "Mar 12", status: "deducted" },
  { id: 7, student: "Preethi Anand", type: "Monthly Tuition", amount: 3500, date: "Mar 10", status: "received" },
];

export default function EarningsPage() {
  const monthlyData = [8500, 9200, 11000, 8800, 12500, 14000];
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const maxVal = Math.max(...monthlyData);

  return (
    <DashboardLayout role="tutor">
      <div className="mb-7">
        <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Earnings Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Track your income from courses and tuition sessions</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        {[
          { label: "Total Earnings", value: `₹${tutorProfile.totalEarnings.toLocaleString()}`, change: "+23%", up: true, sub: "All time", color: "#22C55E", bg: "#F0FDF4" },
          { label: "This Month", value: `₹${tutorProfile.thisMonthEarnings.toLocaleString()}`, change: "+18%", up: true, sub: "March 2026", color: "#0056D2", bg: "#EFF6FF" },
          { label: "Pending Payout", value: "₹4,200", change: null, up: null, sub: "Due Apr 1", color: "#F59E0B", bg: "#FFFBEB" },
        ].map(({ label, value, change, up, sub, color, bg }) => (
          <div key={label} className="glass-card p-6 card-hover">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{label}</p>
              {change && (
                <div className={`flex items-center gap-1 text-xs font-bold badge ${up ? "badge-green" : "badge-red"}`}>
                  {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{change}
                </div>
              )}
            </div>
            <p className="text-3xl font-black mb-1" style={{ color }}>
              {value}
            </p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass-card p-6 mb-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold" style={{ color: "#1F2937" }}>Monthly Revenue</h2>
          <span className="text-sm" style={{ color: "#6B7280" }}>Last 6 months</span>
        </div>
        <div className="flex items-end gap-4 h-40">
          {monthlyData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs" style={{ color: "#6B7280" }}>₹{(val / 1000).toFixed(1)}k</p>
              <div
                className="w-full rounded-t-xl transition-all cursor-pointer"
                style={{
                  height: `${(val / maxVal) * 100}%`,
                  background: i === 5 ? "#0056D2" : "#BFDBFE",
                  minHeight: "12px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = i === 5 ? "#0042A8" : "#93C5FD")}
                onMouseLeave={(e) => (e.currentTarget.style.background = i === 5 ? "#0056D2" : "#BFDBFE")}
              />
              <span className="text-xs" style={{ color: "#9CA3AF" }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-bold mb-4" style={{ color: "#1F2937" }}>Income Breakdown</h3>
          {[
            { label: "Tuition Fees", value: 63000, pct: 74, color: "#0056D2" },
            { label: "Course Sales", value: 17500, pct: 21, color: "#7C3AED" },
            { label: "Bonuses", value: 4000, pct: 5, color: "#22C55E" },
          ].map(({ label, value, pct, color }) => (
            <div key={label} className="mb-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span style={{ color: "#4B5563" }}>{label}</span>
                <span className="font-semibold" style={{ color: "#1F2937" }}>₹{value.toLocaleString()} ({pct}%)</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: "#F3F4F6" }}>
                <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold" style={{ color: "#1F2937" }}>Recent Transactions</h3>
            <span className="badge badge-blue">March 2026</span>
          </div>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 p-3 rounded-xl transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: tx.status === "received" ? "#F0FDF4" : "#FEF2F2" }}
                >
                  {tx.status === "received"
                    ? <ArrowUpRight size={16} style={{ color: "#22C55E" }} />
                    : <ArrowDownRight size={16} style={{ color: "#EF4444" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "#1F2937" }}>{tx.student}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{tx.type} · {tx.date}</p>
                </div>
                <p className={`font-bold text-sm whitespace-nowrap ${tx.amount > 0 ? "" : ""}`}
                  style={{ color: tx.amount > 0 ? "#22C55E" : "#EF4444" }}>
                  {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
