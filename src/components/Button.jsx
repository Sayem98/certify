import React from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.08,
    transition: {
      type: "spring",
    },
  },
};

function Button({ title, onHandleClick, className }) {
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      className={`bg-[#76ba1b] text-black flex items-center gap-2 border px-5 lg:px-6 py-3 self-baseline ${className}`}
      onClick={onHandleClick}
    >
      <span className="text-lg font-semibold">{title}</span>
    </motion.button>
  );
}

export default Button;
