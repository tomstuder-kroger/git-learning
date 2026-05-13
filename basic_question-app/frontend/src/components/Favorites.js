import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';

const categoryColors = {
  'Would you rather?': '#007bff',
  'You or me?': '#28a745',
  'Random Facts': '#ffc107',
  'Food for Thought': '#6f42c1'
};

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">❤️ My Favorites</h1>
        <p className="lead text-muted">
          {favorites.length} saved question{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      {favorites.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h5>No favorites yet!</h5>
          <p className="mb-0">Start favoriting questions to build your collection.</p>
        </Alert>
      ) : (
        <Row className="g-4">
          {favorites.map((fav, index) => (
            <Col key={index} md={6} lg={4}>
              <Card
                className="h-100 shadow-sm favorite-card"
                style={{ borderLeft: `4px solid ${categoryColors[fav.category]}` }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge
                      bg=""
                      style={{
                        backgroundColor: categoryColors[fav.category],
                        fontSize: '0.75rem'
                      }}
                    >
                      {fav.category}
                    </Badge>
                    <span style={{ fontSize: '1.2rem' }}>❤️</span>
                  </div>
                  <Card.Text className="mt-3">
                    {fav.question}
                  </Card.Text>
                  <div className="text-muted mt-3" style={{ fontSize: '0.8rem' }}>
                    Saved {new Date(fav.favorited_at).toLocaleDateString()}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favorites;
