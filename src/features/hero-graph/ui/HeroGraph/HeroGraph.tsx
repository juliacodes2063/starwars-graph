import { ReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import type { ApiFilm, ApiPerson, ApiStarship } from '../../../../api/starwars.types';
import { HeroNode } from '../HeroNode';
import { SimpleNode } from '../SimpleNode';
import { useIsMobile } from '../../../../shared/utils/useIsMobile';
import { buildGraph } from '../../model/buildGraph';
import styles from './HeroGraph.module.scss';

type HeroGraphProps = {
  person: ApiPerson;
  films: ApiFilm[];
  starships: ApiStarship[];
  imageUrl: string;
};

const nodeTypes = {
  hero: HeroNode,
  film: SimpleNode,
  starship: SimpleNode,
};

// Visualizes hero, films and starships as a React Flow graph
export function HeroGraph({ person, films, starships, imageUrl }: HeroGraphProps) {
  const isMobile = useIsMobile();
  const { nodes, edges } = buildGraph(
    person,
    films,
    starships,
    imageUrl,
    isMobile ? 'mobile' : 'desktop',
  );

  return (
    <div className={styles.heroesGraph}>
      <ReactFlow
        key={`${person.id}-${isMobile}`}
        defaultNodes={nodes}
        defaultEdges={edges}
        fitView
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
