"use client";
import { useEffect, useLayoutEffect, useRef, useReducer } from "react";
import DigitalClock from "../src/Components/Time";
import styles from "../src/styles/components/dashbord.module.scss";
import { gsap } from "gsap-trial";
import { GSDevTools } from "gsap-trial/all";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { SplitText } from "gsap-trial/SplitText";
import { arrayToObject } from "../src/util/ConvertionUtility";
import useFetch from "../src/hooks/useFetch";
type SplitTextElement = HTMLHeadingElement & {
  split: any;
  animate: any;
};
gsap.registerPlugin(SplitText, ScrollTrigger);
export default function Page() {
  const root = useRef(null);
  const textRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    useFetch(
      "https://api.open-meteo.com/v1/forecast?latitude=39.2979838&longitude=-76.5809694&current=temperature_2m,relativehumidity_2m,is_day,precipitation,rain,showers,snowfall,weathercode,cloudcover&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York",
      (data) => {}
    );

    return () => {};
  }, []);

  useLayoutEffect(() => {
    let animationContext = gsap.context(() => {
      let split = new SplitText(textRef.current, {
        type: "chars",
        linesClass: "split-line",
      });
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          // pin the trigger element while active
          start: "top center", // when the top of the trigger hits the top of the viewport
          toggleActions: "restart pause resume reverse",
          markers: true,
          // end after scrolling 500px beyond the start
          // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          // snap: {
          //   snapTo: "labels", // snap to the closest label in the timeline
          //   duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
          //   ease: "power1.inOut",
          // },
        },
      });
      // .from(textRef.current.split.chars, {
      //   duration: 0.6,
      //   ease: "circ.out",
      //   y: 100,
      //   stagger: 0.1,
      // })
      timeline.from(split.chars, {
        delay: 0,
        duration: 0.3,
        ease: "circ.out",
        y: 100,
        stagger: 0.04,
      });
    }, root);
    return () => {
      animationContext.revert();
    };
  }, []);
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <DigitalClock />
      <div ref={root} className={`${styles.dash} dash`}>
        <div ref={boxRef} className={styles.box}></div>
        <h1 ref={textRef} className={styles.text}>
          Here is some text &nbsp; made visible.
        </h1>
      </div>
    </>
  );
}
