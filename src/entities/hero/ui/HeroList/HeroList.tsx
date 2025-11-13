import type { ApiPerson } from '../../../../api/starwars.types';
import { getIdFromUrl } from '../../../../shared/utils/getIdFromUrl';
import { HeroCard } from '../HeroCard';
import styles from './HeroList.module.scss';

type HeroListProps = {
  heroes: ApiPerson[];
  imageMap?: Record<string, string>;
};

export function HeroList({ heroes, imageMap = {} }: HeroListProps) {
  return (
    <div className={styles.heroesGrid}>
      {heroes.map((person) => {
        const id = getIdFromUrl(person.url);
        if (!id) {
          return null;
        }

        const imageUrl = imageMap[id];
        //const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

        return <HeroCard key={id} id={id} name={person.name} imageUrl={imageUrl} />;
      })}
    </div>
  );
}
