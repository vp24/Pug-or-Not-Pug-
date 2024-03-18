import React, { useState } from 'react';
import axios from 'axios';
import './ImageDetection.css';

const ImageDetection = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [detectionResult, setDetectionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleDetection = () => {
    setIsLoading(true);
    axios.post('http://localhost:3000/detect', { input: imageUrl })
      .then(response => {
        const concepts = response.data.outputs[0].data.concepts;
        const filteredConcepts = concepts.filter(concept => concept.value > 0.5);
        const sortedConcepts = filteredConcepts.sort((a, b) => b.value - a.value);

        const pugConcept = concepts.find(concept => concept.name === 'pug');

        if (pugConcept && pugConcept.value > 0.8) {
          setDetectionResult('Yes, it looks like a pug!');
        } else {
          if (sortedConcepts.length > 0) {
            const topConcept = sortedConcepts[0];
            setDetectionResult(`No, that does not look like a pug. That looks like a ${topConcept.name}.`);
          } else {
            setDetectionResult('Unable to determine what the image looks like.');
          }
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="image-detection">
      <h2>Is this a Pug?</h2>
      <div className="input-container">
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Enter image URL"
        />
        <button onClick={handleDetection} disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Pug?'}
        </button>
      </div>
      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
      {isLoading && <p>Analyzing image...</p>}
      {detectionResult && (
        <div className="results-container">
          <h3>Detection Result:</h3>
          <p>{detectionResult}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDetection;