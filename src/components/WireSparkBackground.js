import React from 'react';
import { motion } from 'framer-motion';
import './WireSpark.css';

const WireSparkBackground = () => {
  // Spark lines variants - horizontal sparks
//   const sparkVariants = {
//     animate: (i) => ({
//       opacity: [0, 1, 0],
//       scaleX: [0, 1, 0.8],
//       x: ["0%", "100%"],
//       transition: {
//         duration: 3,
//         repeat: Infinity,
//         delay: i * 0.8,
//         ease: "easeInOut",
//       }
//     })
//   };

  // Vertical spark variants
//   const verticalSparkVariants = {
//     animate: (i) => ({
//       opacity: [0, 1, 0],
//       scaleY: [0, 1, 0.8],
//       y: ["0%", "100%"],
//       transition: {
//         duration: 3.5,
//         repeat: Infinity,
//         delay: i * 1,
//         ease: "easeInOut",
//       }
//     })
//   };

  // Thunder burst variants
  const thunderBurstVariants = {
    animate: {
      opacity: [0, 1, 0.8, 0],
      scale: [0, 1.2, 1, 0],
      boxShadow: [
        "0 0 0px rgba(72, 169, 230, 0)",
        "0 0 30px rgba(72, 169, 230, 1)",
        "0 0 50px rgba(27, 91, 175, 1)",
        "0 0 0px rgba(27, 91, 175, 0)"
      ],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay: 3,
        ease: "easeOut",
      }
    }
  };

  // Lightning bolt variants
  const lightningVariants = {
    animate: (i) => ({
      opacity: [0, 1, 0],
      pathLength: [0, 1, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        delay: 3.1 + i * 0.15,
        ease: "easeInOut",
      }
    })
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      {/* Right side vertical sparks */}
      {/* {[1, 2, 3].map((i) => (
        <motion.div
          key={`right-${i}`}
          custom={i}
        //   variants={verticalSparkVariants}
          animate="animate"
          style={{
            position: 'absolute',
            top: 0,
            right: `${i * 15}%`,
            width: '3px',
            height: '200px',
            background: 'linear-gradient(180deg, transparent, #1b5baf, #48A9E6, #ffffff, transparent)',
            boxShadow: '0 0 15px #48A9E6, 0 0 25px #1b5baf',
            filter: 'blur(0.5px)',
          }}
        />
      ))} */}

      {/* Bottom horizontal sparks */}
      {/* {[1, 2, 3].map((i) => (
        <motion.div
          key={`bottom-${i}`}
          custom={i}
        //   variants={sparkVariants}
          animate="animate"
          style={{
            position: 'absolute',
            bottom: `${i * 20}%`,
            left: '30%',
            width: '300px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #1b5baf, #48A9E6, #ffffff, transparent)',
            boxShadow: '0 0 15px #48A9E6, 0 0 25px #1b5baf',
            filter: 'blur(0.5px)',
          }}
        />
      ))} */}

      {/* Thunder burst - right side */}
      {/* <motion.div
        variants={thunderBurstVariants}
        animate="animate"
        style={{
          position: 'absolute',
          top: '50%',
          right: '15%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #48A9E6 0%, rgba(72, 169, 230, 0.5) 50%, transparent 100%)',
          transform: 'translate(50%, -50%)',
        }}
      /> */}

      {/* Lightning bolts radiating from burst */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={`lightning-${i}`}
          custom={i}
          variants={lightningVariants}
          animate="animate"
          style={{
            position: 'absolute',
            top: '50%',
            right: '15%',
            width: '2px',
            height: '100px',
            background: 'linear-gradient(180deg, #ffffff, #48A9E6, transparent)',
            transformOrigin: '1px 0px',
            transform: `translateX(50%) translateY(-50%) rotate(${angle}deg)`,
            boxShadow: '0 0 8px #48A9E6, 0 0 15px #1b5baf',
          }}
        />
      ))}

      {/* Thunder burst - bottom */}
      {/* <motion.div
        variants={thunderBurstVariants}
        animate="animate"
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '45%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #48A9E6 0%, rgba(72, 169, 230, 0.5) 50%, transparent 100%)',
          transform: 'translate(-50%, 50%)',
        }}
      /> */}

      {/* Lightning bolts from bottom burst */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={`lightning-bottom-${i}`}
          custom={i}
          variants={lightningVariants}
          animate="animate"
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '40%',
            width: '2px',
            height: '100px',
            background: 'linear-gradient(180deg, #ffffff, #48A9E6, transparent)',
            transformOrigin: '1px 0px',
            transform: `translateX(-50%) translateY(50%) rotate(${angle}deg)`,
            boxShadow: '0 0 8px #48A9E6, 0 0 15px #1b5baf',
          }}
        />
      ))}
    </div>
  );
};

export default WireSparkBackground;

