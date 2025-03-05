import { FC } from 'react';
import ValvoDetails from './ValvoDetails';

interface ValvoDetailsPageProps {
  params: {
    id: string;
  };
}

const ValvoDetailsPage: FC<ValvoDetailsPageProps> = async ({ params }) => {
  const { id: valvoId } = await params;

  return <ValvoDetails valvoId={valvoId} />;
};

export default ValvoDetailsPage;
