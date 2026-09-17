import { useMemo, useState } from 'react';
import './PlacementFilters.css';

const jobs = [
  {
    id: 1,
    company: 'Microsoft',
    role: 'Frontend Developer',
    city: 'Bangalore',
    experience: 'Fresher',
    type: 'Full-time',
    package: '8.5 LPA',
    skills: 'React • JavaScript • CSS',
    dueDate: 'Due 12 Sep',
  },
  {
    id: 2,
    company: 'Google',
    role: 'Software Engineer',
    city: 'Hyderabad',
    experience: 'Fresher',
    type: 'Full-time',
    package: '12 LPA',
    skills: 'Java • Python • DSA',
    dueDate: 'Due 14 Sep',
  },
  {
    id: 3,
    company: 'Accenture',
    role: 'Associate Developer',
    city: 'Pune',
    experience: '0-1 yrs',
    type: 'Full-time',
    package: '5.5 LPA',
    skills: 'React • Node.js',
    dueDate: 'Due 16 Sep',
  },
  {
    id: 4,
    company: 'Capgemini',
    role: 'Software Analyst',
    city: 'Chennai',
    experience: 'Fresher',
    type: 'Full-time',
    package: '4.5 LPA',
    skills: 'Java • SQL',
    dueDate: 'Due 18 Sep',
  },
  {
    id: 5,
    company: 'IBM',
    role: 'Application Developer',
    city: 'Bangalore',
    experience: '1-2 yrs',
    type: 'Full-time',
    package: '7 LPA',
    skills: 'Java • Cloud • SQL',
    dueDate: 'Due 20 Sep',
  },
  {
    id: 6,
    company: 'Tech Mahindra',
    role: 'Graduate Engineer',
    city: 'Hyderabad',
    experience: 'Fresher',
    type: 'Full-time',
    package: '4 LPA',
    skills: 'C++ • Java • Networking',
    dueDate: 'Due 22 Sep',
  },
  {
    id: 7,
    company: 'Oracle',
    role: 'Cloud Engineer Intern',
    city: 'Remote',
    experience: 'Fresher',
    type: 'Internship',
    package: '₹50k/mo',
    skills: 'Cloud • Python • SQL',
    dueDate: 'Due 24 Sep',
  },
  {
    id: 8,
    company: 'Adobe',
    role: 'UI Developer',
    city: 'Pune',
    experience: '0-1 yrs',
    type: 'Full-time',
    package: '8 LPA',
    skills: 'HTML • CSS • React',
    dueDate: 'Due 26 Sep',
  },
  {
    id: 9,
    company: 'Cognizant',
    role: 'Programmer Analyst',
    city: 'Chennai',
    experience: '0-1 yrs',
    type: 'Full-time',
    package: '4.2 LPA',
    skills: 'Python • SQL • Java',
    dueDate: 'Due 28 Sep',
  },
  {
    id: 10,
    company: 'Deloitte',
    role: 'Technology Analyst',
    city: 'Remote',
    experience: '1-2 yrs',
    type: 'Internship',
    package: '₹40k/mo',
    skills: 'Excel • Python • Analytics',
    dueDate: 'Due 30 Sep',
  },
];

const locationOptions = ['All', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Remote'];
const experienceOptions = ['All', 'Fresher', '0-1 yrs', '1-2 yrs'];
const typeOptions = ['All', 'Full-time', 'Internship'];

function DesignCard({ variant, title, subtitle }) {
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [appliedJobs, setAppliedJobs] = useState({});

  const toggleApply = (jobId) => {
    setAppliedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const locationMatch = selectedLocation === 'All' || job.city === selectedLocation;
      const experienceMatch =
        selectedExperience === 'All' || job.experience === selectedExperience;
      const typeMatch = selectedType === 'All' || job.type === selectedType;
      const searchMatch =
        query === '' ||
        `${job.company} ${job.role} ${job.city} ${job.experience} ${job.type} ${job.skills}`
          .toLowerCase()
          .includes(query);

      return locationMatch && experienceMatch && typeMatch && searchMatch;
    });
  }, [search, selectedLocation, selectedExperience, selectedType]);

  const clearFilters = () => {
    setSearch('');
    setSelectedLocation('All');
    setSelectedExperience('All');
    setSelectedType('All');
  };

  return (
    <section className={`design-card ${variant}`}>
      <div className="design-head">
        <div>
          <h3>{title}</h3>
        </div>
        <span className="job-counter">{filteredJobs.length} Jobs</span>
      </div>

      <p className="design-subtitle">{subtitle}</p>

      <div className="filter-shell">
        <aside className="filter-panel">
          <div className="panel-head">
            <span>Filters</span>
            <button type="button" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <label className="search-box">
            <span>Search</span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Company, role, skill"
            />
          </label>

          <div className="filter-group">
            <h4>Location</h4>
            <div className="chip-row">
              {locationOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={selectedLocation === option ? 'chip active' : 'chip'}
                  onClick={() => setSelectedLocation(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Experience</h4>
            <div className="chip-row">
              {experienceOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={selectedExperience === option ? 'chip active' : 'chip'}
                  onClick={() => setSelectedExperience(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Type</h4>
            <div className="chip-row">
              {typeOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={selectedType === option ? 'chip active' : 'chip'}
                  onClick={() => setSelectedType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="jobs-panel">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-topline">
                  <div>
                    <span className="company-name">{job.company}</span>
                    <h4>{job.role}</h4>
                  </div>
                  <span className="job-type">{job.type}</span>
                </div>

                <div className="job-meta">
                  <span>{job.city}</span>
                  <span>{job.experience}</span>
                  <span>{job.package}</span>
                </div>

                <p className="skills">{job.skills}</p>

                <div className="job-bottom">
                  <span>{job.dueDate}</span>
                  <button
                    type="button"
                    className={appliedJobs[job.id] ? 'applied' : ''}
                    onClick={() => toggleApply(job.id)}
                  >
                    {appliedJobs[job.id] ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h4>No matching jobs found</h4>
              <p>Try clearing a filter or searching with another keyword.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  const designs = [
    { variant: 'variant', title: 'Design '  },

  ];

  return (
    <div className="showcase-page">
      <header className="showcase-header">
        <div>
          <p className="eyebrow">Filters Section</p>
          <h1> Placement Drive Board </h1>
        </div>
       
      </header>

      <main className="design-grid">
        {designs.map((design) => (
          <DesignCard
            key={design.variant}
            variant={design.variant}
            title={design.title}
            subtitle={design.subtitle}
          />
        ))}
      </main>
    </div>
  );
}

export default App;