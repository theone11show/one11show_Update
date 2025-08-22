import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaRegCalendarAlt, FaStar, FaTicketAlt } from "react-icons/fa";

const days = [
  {
    day: "Day 1",
    date: "12 Aug 2025",
    details: "Opening ceremony with performances and keynote sessions.",
    highlights: "Live music, celebrity guest appearance, and networking.",
    ticketUrl: "https://bookmyshow.com/day1-ticket"
  },
  {
    day: "Day 2",
    date: "13 Aug 2025",
    details: "Workshops, panel discussions, and interactive sessions.",
    highlights: "Exclusive workshops with industry leaders.",
    ticketUrl: "https://bookmyshow.com/day2-ticket"
  },
  {
    day: "Day 3",
    date: "14 Aug 2025",
    details: "Grand finale with closing speech and gala dinner.",
    highlights: "Award ceremony, gala dinner, and closing party.",
    ticketUrl: "https://bookmyshow.com/day3-ticket"
  }
];

export default function Timeline() {
  const [selected, setSelected] = useState(null);
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ width: "100%" });
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <div className="p-10 max-w-6xl mx-auto bg-gray-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-extrabold mb-12 text-center tracking-tight text-gray-900">
        🎉 Event Timeline
      </h1>

      {/* Timeline container */}
      <div className="relative flex justify-between items-start">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200" ref={ref}>
          <motion.div
            className="h-1 bg-indigo-700"
            initial={{ width: "0%" }}
            animate={controls}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        {days.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-1/3 relative">
            {/* Timeline Dot with Tooltip */}
            <div className="group relative flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-10 h-10 bg-indigo-700 text-white font-bold flex items-center justify-center rounded-full z-10 shadow-lg cursor-pointer border-2 border-white"
                onClick={() => setSelected(selected === `details-${index}` ? null : `details-${index}`)}
              >
                {index + 1}
              </motion.div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-14 bg-gray-900 text-white text-xs rounded-md px-3 py-1 shadow-lg whitespace-nowrap pointer-events-none"
              >
                {item.day} – {item.details.split(" ").slice(0, 4).join(" ")}...
              </motion.div>
            </div>

            {/* Floating Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mt-8 bg-white rounded-2xl p-6 w-72 text-center border border-gray-100 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2 text-indigo-800">
                <FaRegCalendarAlt /> {item.day}
              </h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">{item.date}</p>

              <div className="flex flex-col gap-3">
                <button
                  className="px-3 py-1.5 rounded-lg border border-indigo-700 text-indigo-700 hover:bg-indigo-50 transition text-sm font-medium"
                  onClick={() => setSelected(selected === `details-${index}` ? null : `details-${index}`)}
                >
                  Details
                </button>

                <button
                  className="px-3 py-1.5 rounded-lg border border-amber-500 text-amber-600 hover:bg-amber-50 transition text-sm font-medium"
                  onClick={() => setSelected(selected === `highlights-${index}` ? null : `highlights-${index}`)}
                >
                  Highlights
                </button>

                <button
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white flex items-center gap-2 justify-center hover:bg-rose-700 transition text-sm font-semibold"
                  onClick={() => window.open(item.ticketUrl, "_blank")}
                >
                  <FaTicketAlt /> Tickets
                </button>
              </div>

              {/* Expandable Content */}
              {selected === `details-${index}` && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-indigo-50 p-4 rounded-lg text-sm text-gray-700 shadow-inner text-left"
                >
                  {item.details}
                </motion.div>
              )}

              {selected === `highlights-${index}` && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-amber-50 p-4 rounded-lg text-sm text-gray-700 flex gap-2 items-start shadow-inner text-left"
                >
                  <FaStar className="text-amber-500 mt-0.5" /> {item.highlights}
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
