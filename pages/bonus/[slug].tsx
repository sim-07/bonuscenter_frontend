import fs from 'fs';
import path from 'path';

interface BonusData {
  title: string;
  paragraphs: string[];
}

interface Props {
  bonus: BonusData;
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'src', 'components', 'data', 'bonusDescription');
  const files = fs.readdirSync(dir);

  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.json', '') }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const dir = path.join(process.cwd(), 'src', 'components', 'data', 'bonusDescription');
  const filePath = path.join(dir, `${params.slug}.json`);

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const bonus = JSON.parse(fileContents);

  return {
    props: {
      bonus
    }
  };
}

export default function BonusDescriptionPage({ bonus }: Props) {
  return (
    <div>
      <h1>{bonus.title}</h1>
      {bonus.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
