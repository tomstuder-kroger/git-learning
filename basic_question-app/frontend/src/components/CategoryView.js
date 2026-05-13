import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';

const categoryColors = {
  'Would you rather?': '#007bff',
  'You or me?': '#28a745',
  'Random Facts': '#ffc107',
  'Food for Thought': '#6f42c1'
};

function CategoryView() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const categoryColor = categoryColors[decodedCategory] || '#007bff';

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seenIds, setSeenIds] = useState([]);
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(null);

  const fetchQuestion = async () => {
    setLoading(true);
    setShowResetAlert(false);

    try {
      const response = await fetch('http://localhost:5000/api/questions/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: decodedCategory,
          seenIds: seenIds
        })
      });

      const data = await response.json();

      if (data.reset) {
        setSeenIds([data.question.id]);
        setShowResetAlert(true);
      } else {
        setSeenIds([...seenIds, data.question.id]);
      }

      setQuestion(data.question);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchTotalCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTotalCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      const categoryData = data.find(cat => cat.category === decodedCategory);
      if (categoryData) {
        setTotalQuestions(categoryData.count);
      }
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: question.id
        })
      });

      const data = await response.json();
      setQuestion({ ...question, is_favorited: data.favorited });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading && !question) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" style={{ color: categoryColor }} />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: categoryColor }}>
          {decodedCategory}
        </h2>
      </div>

      {showResetAlert && (
        <Alert variant="info" dismissible onClose={() => setShowResetAlert(false)}>
          You've seen all questions in this category! Starting over.
        </Alert>
      )}

      <Card
        className="question-card shadow-lg mx-auto"
        style={{
          maxWidth: '700px',
          borderTop: `6px solid ${categoryColor}`
        }}
      >
        <Card.Body className="p-5">
          <div className="question-text text-center mb-4">
            <p className="display-6 fw-light">
              {question?.question}
            </p>
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              variant="outline-danger"
              size="lg"
              onClick={toggleFavorite}
              className="px-4"
            >
              {question?.is_favorited ? '❤️ Favorited' : '🤍 Favorite'}
            </Button>

            <Button
              size="lg"
              style={{
                backgroundColor: categoryColor,
                borderColor: categoryColor
              }}
              onClick={fetchQuestion}
              disabled={loading}
              className="px-4"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                'Next Question →'
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <div className="text-center mt-4 text-muted">
        <small>
          Question {seenIds.length} in this session
          {totalQuestions && (
            <> • {totalQuestions} total questions available</>
          )}
        </small>
      </div>
    </Container>
  );
}

export default CategoryView;
