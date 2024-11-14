import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Error from 'next/error';

function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          {`Date: ${data.objectDate || 'N/A'}\nClassification: ${data.classification || 'N/A'}\nMedium: ${data.medium || 'N/A'}`}
        </Card.Text>
        <br /><br />
        {`Artist: ${data.artistDisplayName || 'N/A'}`}
        {data.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer"> wiki</a>}
        <br />
        {`Credit Line: ${data.creditLine || 'N/A'}`}
        <br />
        {`Dimensions: ${data.dimensions || 'N/A'}`}
      </Card.Body>
    </Card>
  );
}

export default ArtworkCardDetail;
