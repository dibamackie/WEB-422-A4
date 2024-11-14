import { useRouter } from 'next/router';
import useSWR from 'swr';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCard from '../../components/ArtworkCard';
import Error from 'next/error';

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  const { q, searchBy, geoLocation, medium, isHighlight, isOnView } = router.query; // Get query params from URL

  // Construct API endpoint based on query parameters
  let queryString = `q=${q || ""}`;
  if (geoLocation) queryString += `&geoLocation=${geoLocation}`;
  if (medium) queryString += `&medium=${medium}`;
  if (isHighlight) queryString += `&isHighlight=${isHighlight}`;
  if (isOnView) queryString += `&isOnView=${isOnView}`;

  // Only fetch if there's a query
  const { data, error } = useSWR(
    q ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${queryString}` : null
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return <p>Loading...</p>;

  const artworkIDs = data.objectIDs || [];

  return (
    <>
      <Row className="gy-4">
        {artworkIDs.length > 0 ? (
          artworkIDs.slice(0, PER_PAGE).map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <h4>Nothing Here. Try searching for something else.</h4>
          </Col>
        )}
      </Row>
    </>
  );
}
