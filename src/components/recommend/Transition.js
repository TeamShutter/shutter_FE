import { Box } from "@mui/material";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "../../styles/Recommend.module.css";

export default function Transition({ children, ...props }) {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      {...props}
      timeout={500}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: styles.RecommendEnter,
        enterActive: styles.RecommendEnterActive,
        exit: styles.RecommendExit,
        exitActive: styles.RecommendExitActive,
      }}
    >
      <Box className={styles.RecommendSelectBox} ref={nodeRef}>
        {children}
      </Box>
    </CSSTransition>
  );
}
