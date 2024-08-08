import React, { useState } from "react";
import { LayoutGroup } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import CompactCard from "./CompactCard";
import ExpandCard from "./ExpandCard";

export default function Card(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <LayoutGroup>
      {expanded ? (
        <ExpandCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </LayoutGroup>
  );
}
