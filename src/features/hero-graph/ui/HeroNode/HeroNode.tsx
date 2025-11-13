import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import styles from './HeroNode.module.scss';

type HeroNodeData = {
  label: string;
  badge: 'Hero';
  imageUrl?: string;
};

// Node type used as the main hero entry in the React Flow graph
export function HeroNode({ data }: NodeProps<HeroNodeData>) {
  const { label, imageUrl, badge } = data;

  return (
    <>
      {/* Incoming/Outgoing connections for React Flow */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/* Floating animated hero card */}
      <motion.div
        className={styles.root}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.03 }}
      >
        {imageUrl && (
          <div className={styles.avatarWrapper}>
            <img src={imageUrl} alt={label} className={styles.avatar} />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.label}>{label}</div>
          <div className={styles.badge}>{badge}</div>
        </div>
      </motion.div>
    </>
  );
}
