import React, { useState } from 'react';

function Feed() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    rating: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Please provide a rating';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Feedback submitted:', formData);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          category: '',
          rating: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  if (submitted) {
    return (
      <div className="feed-container">
        <div className="feedback-success">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Thank You!</h2>
          <p className="success-message">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="feedback-form-wrapper">
        <h2 className="feedback-title">We'd Love Your Feedback</h2>
        <p className="feedback-subtitle">Help us improve by sharing your thoughts and suggestions.</p>
        
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Category </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? 'input-error' : ''}`}
            >
              <option value="">Select a category</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="improvement">Improvement</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="error-message">{errors.category}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Rating </label>
            <div className="rating-buttons">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, rating: star.toString() }));
                    setErrors(prev => ({ ...prev, rating: '' }));
                  }}
                  className={`rating-button ${formData.rating === star.toString() ? 'rating-active' : ''}`}
                >
                  {star}
                </button>
              ))}
            </div>
            {errors.rating && <p className="error-message">{errors.rating}</p>}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              placeholder="Tell us what's on your mind..."
              className={`form-textarea ${errors.message ? 'input-error' : ''}`}
            />
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>

          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feed;