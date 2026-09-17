import { useState } from "react";
import "./JobCards.css";

const jobsData = [
  {
    id: 1,
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    title: "Frontend Developer",
    location: "Bangalore, India",
    jobType: "Full-time",
    experience: "0-2 Years",
    salary: "₹8 - ₹12 LPA",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    title: "React Developer",
    location: "Hyderabad, India",
    jobType: "Full-time",
    experience: "1-3 Years",
    salary: "₹10 - ₹16 LPA",
    postedDate: "4 days ago",
  },
];

function App() {
 
  const [savedJobs, setSavedJobs] = useState([]);

 
  const [appliedJobs, setAppliedJobs] = useState([]);

 
  const [feedbackJob, setFeedbackJob] = useState(null);

  
  const [rating, setRating] = useState(0);


  const [feedbackText, setFeedbackText] = useState("");

  
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };


  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);

      setSuccessMessage(
        "Application submitted successfully!"
      );

   
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const handleFeedback = (job) => {
    setFeedbackJob(job);
    setRating(0);
    setFeedbackText("");
  };


  const handleSubmitFeedback = () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    if (feedbackText.trim() === "") {
      alert("Please enter your feedback.");
      return;
    }

    alert(
      `Thank you for your feedback!\nRating: ${rating}/5`
    );

    setFeedbackJob(null);
    setRating(0);
    setFeedbackText("");
  };

  return (
    <div className="app-container">

      
      <header className="page-header">
        <div>
          <p className="small-title">PLACEMENT </p>
          <h1>Find Your Dream Job</h1>
          <p className="header-description">
            Explore the latest job opportunities and apply
            for positions that match your skills.
          </p>
        </div>
      </header>

     
      {successMessage && (
        <div className="success-message">
          <span className="success-icon">✓</span>
          {successMessage}
        </div>
      )}

      
      <main className="jobs-container">

        {jobsData.map((job) => {
          const isSaved = savedJobs.includes(job.id);
          const isApplied = appliedJobs.includes(job.id);

          return (
            <article
              className={`job-card ${
                isSaved ? "saved-card" : ""
              }`}
              key={job.id}
            >

             
              <div className="card-top">

                <div className="company-logo">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML =
                        `<span>${job.company.charAt(0)}</span>`;
                    }}
                  />
                </div>

                <button
                  className={`save-button ${
                    isSaved ? "saved" : ""
                  }`}
                  onClick={() => handleSave(job.id)}
                  title={
                    isSaved
                      ? "Remove from saved jobs"
                      : "Save job"
                  }
                >
                  <span className="save-icon">
                    {isSaved ? "♥" : "♡"}
                  </span>

                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>

              
              <div className="job-details">

                <h2>{job.title}</h2>

                <p className="company-name">
                  {job.company}
                </p>

                <div className="job-info">

                  <span>
                    <span className="info-icon">📍</span>
                    {job.location}
                  </span>

                  <span>
                    <span className="info-icon">💼</span>
                    {job.jobType}
                  </span>

                  <span>
                    <span className="info-icon">👤</span>
                    {job.experience}
                  </span>

                  <span>
                    <span className="info-icon">💰</span>
                    {job.salary}
                  </span>

                </div>

                <div className="posted-date">
                  Posted {job.postedDate}
                </div>

              </div>

             
              <div className="card-actions">

                <button
                  className={`apply-button ${
                    isApplied ? "applied" : ""
                  }`}
                  onClick={() => handleApply(job.id)}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <span>✓</span>
                      Applied
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>

                <button
                  className="feedback-button"
                  onClick={() => handleFeedback(job)}
                >
                  💬 Feedback
                </button>

              </div>

            </article>
          );
        })}

      </main>

     
      {feedbackJob && (
        <div
          className="modal-overlay"
          onClick={() => setFeedbackJob(null)}
        >

          <div
            className="feedback-modal"
            onClick={(e) => e.stopPropagation()}
          >

           
            <div className="modal-header">

              <div>
                <p className="modal-label">
                  JOB FEEDBACK
                </p>

                <h2>Share Your Feedback</h2>

                <p className="modal-job-title">
                  {feedbackJob.title} at{" "}
                  {feedbackJob.company}
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setFeedbackJob(null)}
              >
                ×
              </button>

            </div>

           
            <div className="rating-section">

              <label>
                How would you rate this job?
              </label>

              <div className="stars">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={
                      star <= rating
                        ? "star active"
                        : "star"
                    }
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}

              </div>

              {rating > 0 && (
                <p className="rating-text">
                  You selected {rating} out of 5
                </p>
              )}

            </div>

           
            <div className="feedback-input">

              <label htmlFor="feedback">
                Your Feedback
              </label>

              <textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) =>
                  setFeedbackText(e.target.value)
                }
                placeholder="Tell us what you think about this job opportunity..."
                rows="5"
              />

              <span className="character-count">
                {feedbackText.length}/500
              </span>

            </div>

           
            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => setFeedbackJob(null)}
              >
                Cancel
              </button>

              <button
                className="submit-button"
                onClick={handleSubmitFeedback}
              >
                Submit Feedback
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;
