import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

function Home() {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      name: 'Would you rather?',
      description: 'Fun hypothetical scenarios to spark conversation',
      color: '#007bff',
      icon: '🤔'
    },
    {
      name: 'You or me?',
      description: 'Guess who is more likely to do what',
      color: '#28a745',
      icon: '👥'
    },
    {
      name: 'Random Facts',
      description: 'Share interesting facts about yourself',
      color: '#ffc107',
      icon: '💡'
    },
    {
      name: 'Food for Thought',
      description: 'Deep questions for meaningful discussions',
      color: '#6f42c1',
      icon: '🧠'
    }
  ];

  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  const fetchCategoryCounts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();

      // Convert array to object for easy lookup
      const counts = {};
      data.forEach(cat => {
        counts[cat.category] = cat.count;
      });

      setCategoryCounts(counts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching category counts:', error);
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to Icebreaker!</h1>
        <p className="lead text-muted">Choose a category to get started with your team</p>
      </div>

      <Row className="g-4">
        {categories.map((category, index) => (
          <Col key={index} md={6} lg={3}>
            <Link
              to={`/category/${encodeURIComponent(category.name)}`}
              className="text-decoration-none"
            >
              <Card
                className="category-card h-100 shadow-sm hover-lift"
                style={{ borderTop: `4px solid ${category.color}` }}
              >
                <Card.Body className="text-center p-4">
                  <div className="category-icon mb-3" style={{ fontSize: '3rem' }}>
                    {category.icon}
                  </div>
                  <Card.Title className="fw-bold mb-2" style={{ color: category.color }}>
                    {category.name}
                  </Card.Title>
                  {!loading && categoryCounts[category.name] && (
                    <Badge
                      bg="secondary"
                      className="mb-2"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {categoryCounts[category.name]} questions
                    </Badge>
                  )}
                  <Card.Text className="text-muted mt-2">
                    {category.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
