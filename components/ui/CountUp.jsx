"use client";
import { useEffect, useState } from "react";

export default function CountUp({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const animate = () => {
      start += increment;

      if (start >= value) {
        setCount(value);
        return;
      }

      setCount(Math.floor(start));
      requestAnimationFrame(animate);
    };

    animate();
  }, [value, duration]);

  return <>{count}</>;
}
