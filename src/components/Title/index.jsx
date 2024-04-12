import { motion } from "framer-motion";

const Title = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 120, damping: 10 }}
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "var(--azure-600)",
          fontWeight: "bold",
          fontSize: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        {title}
      </h1>
    </motion.div>
  );
};

export default Title;
