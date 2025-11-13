import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import styles from './SimpleNode.module.scss';

type SimpleNodeData = {
  label: string;
  badge: 'Film' | 'Ship';
};

// Generic node used for films and starships in the React Flow graph

export function SimpleNode({ data }: NodeProps<SimpleNodeData>) {
  const { label, badge } = data;

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className={styles.root}>
        <div className={styles.badge}>{badge}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </>
  );
}
